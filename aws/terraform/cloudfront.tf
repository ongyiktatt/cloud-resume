locals {
  # AWS-managed policies. These IDs are global constants rather than account-scoped
  # values, so they are safe to commit. Both are documented at
  # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-response-headers-policies.html
  # (SecurityHeadersPolicy) and .../using-managed-cache-policies.html (CachingOptimized).
  #
  # Confirm them against the live distribution before adopting it:
  #
  #   aws cloudfront get-distribution-config --id <distribution-id> \
  #     --query 'DistributionConfig.DefaultCacheBehavior.[CachePolicyId,ResponseHeadersPolicyId]'
  #
  caching_optimized_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  security_headers_policy_id  = "67f7725c-6f97-4210-82d7-5512b31e9d03"

  # CloudFront will not attach a certificate that is still pending validation, so prefer the
  # validated resource when Terraform is managing DNS.
  certificate_arn = (
    var.hosted_zone_id == null
    ? aws_acm_certificate.site.arn
    : aws_acm_certificate_validation.site[0].certificate_arn
  )

  web_acl_id = var.waf_web_acl_arn != null ? var.waf_web_acl_arn : aws_wafv2_web_acl.site[0].arn
}

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.site_domain}-oac"
  description                       = "Origin access control for the ${var.site_domain} bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_function" "response_headers" {
  name    = "${var.stack_name}-response-headers"
  runtime = "cloudfront-js-2.0"
  comment = "Adds Content-Security-Policy and Permissions-Policy"
  publish = true

  code = replace(
    file("${path.module}/files/response-headers.js"),
    "__CONNECT_SRC__",
    aws_lambda_function_url.contact_form.function_url,
  )
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.site_domain} (${var.stack_name})"
  default_root_object = "index.html"
  aliases             = [var.site_domain]
  price_class         = var.price_class

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-${aws_s3_bucket.site.bucket}"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  # A single default cache behaviour: no extra behaviours and no path-based routing. The
  # export is fully static and fingerprinted by Next.js, so there is no origin-side compute
  # to manage.
  default_cache_behavior {
    target_origin_id           = "s3-${aws_s3_bucket.site.bucket}"
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    cache_policy_id            = local.caching_optimized_policy_id
    response_headers_policy_id = local.security_headers_policy_id

    function_association {
      event_type   = "viewer-response"
      function_arn = aws_cloudfront_function.response_headers.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = local.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = var.minimum_protocol_version
  }

  web_acl_id = local.web_acl_id
}
