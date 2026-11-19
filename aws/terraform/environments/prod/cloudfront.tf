# Cloudfront distribution for the site
resource "aws_cloudfront_distribution" "site" {
  aliases             = [var.domain_name]
  comment             = "Production - Resume website"
  default_root_object = "index.html"
  enabled             = true
  is_ipv6_enabled     = true
  wait_for_deployment = true
  web_acl_id          = aws_wafv2_web_acl.site.arn
  default_cache_behavior {
    allowed_methods            = ["GET", "HEAD"]
    cache_policy_id            = aws_cloudfront_cache_policy.site.id
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    response_headers_policy_id = aws_cloudfront_response_headers_policy.site.id
    target_origin_id           = local.origin_id
    viewer_protocol_policy     = "redirect-to-https"
    function_association {
      event_type   = "viewer-response"
      function_arn = aws_cloudfront_function.site.arn
    }
  }
  origin {
    domain_name                 = aws_s3_bucket.site.bucket_regional_domain_name
    origin_access_control_id    = "E3KU35PICGK4A"
    origin_id                   = local.origin_id
    connection_attempts         = 3
    connection_timeout          = 10
    response_completion_timeout = 0
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.domain_wildcard.arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }
}
# Cloudfront cache policy for the site
resource "aws_cloudfront_cache_policy" "site" {
  comment = "Policy with caching enabled. Supports Gzip and Brotli compression."
  min_ttl = 1
  name    = "Managed-CachingOptimized"
  parameters_in_cache_key_and_forwarded_to_origin {
    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}
# Cloudfront headers policy
resource "aws_cloudfront_response_headers_policy" "site" {
  comment = "Adds a set of security headers to every response"
  name    = "Managed-SecurityHeadersPolicy"
  security_headers_config {
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "SAMEORIGIN"
      override     = false
    }
    referrer_policy {
      override        = false
      referrer_policy = "strict-origin-when-cross-origin"
    }
    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = false
      override                   = false
      preload                    = false
    }
    xss_protection {
      mode_block = true
      override   = false
      protection = true
    }
  }
}
# Cloudfront function
resource "aws_cloudfront_function" "site" {
  code    = file("${path.module}/cloudfront_function/function.js")
  comment = "Adds CSP and Permissions-Policy to viewer responses"
  name    = "prod-resume-response-headers"
  publish = true
  runtime = "cloudfront-js-2.0"
}
