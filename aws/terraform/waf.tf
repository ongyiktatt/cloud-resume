# CloudFront protects the site itself. Note the gap: the contact form POSTs straight to the
# Lambda Function URL, bypassing CloudFront entirely, so none of these rules see that
# traffic. Reserved concurrency on the function is the backstop for the form — see
# aws/recaptcha-verify/README.md.
#
# On a Free pricing plan account CloudFront creates a `CreatedByCloudFront-*` web ACL and
# associates it for you. That ACL is editable, but it is also adopted rather than created:
# pass its ARN as var.waf_web_acl_arn to leave it in place, or set that variable to null and
# let this resource manage its own ACL.
resource "aws_wafv2_web_acl" "site" {
  count    = var.waf_web_acl_arn == null ? 1 : 0
  provider = aws.us_east_1

  name        = "${var.stack_name}-web-acl"
  description = "Managed rule groups plus a per-IP rate limit for ${var.site_domain}"
  scope       = "CLOUDFRONT"

  default_action {
    allow {}
  }

  rule {
    name     = "AWSManagedRulesAmazonIpReputationList"
    priority = 0

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesAmazonIpReputationList"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWSManagedRulesAmazonIpReputationList"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 1

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWSManagedRulesCommonRuleSet"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWSManagedRulesKnownBadInputsRuleSet"
    priority = 2

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesKnownBadInputsRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWSManagedRulesKnownBadInputsRuleSet"
      sampled_requests_enabled   = true
    }
  }

  # Aggregate key is the client IP and the evaluation window is fixed at 300 s by the API.
  # Changes take a few minutes to propagate, so a burst fired immediately after an apply can
  # still return 200 while the rule is already in place.
  rule {
    name     = "RateLimitPerIp"
    priority = 3

    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit              = var.waf_rate_limit
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "RateLimitPerIp"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${var.stack_name}-web-acl"
    sampled_requests_enabled   = true
  }
}
