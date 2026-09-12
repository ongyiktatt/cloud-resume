# A certificate used by CloudFront has to live in us-east-1, whatever region the rest of
# the stack is in.
resource "aws_acm_certificate" "site" {
  provider = aws.us_east_1

  domain_name               = var.site_domain
  subject_alternative_names = var.certificate_alternative_names
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Everything below is created only when var.hosted_zone_id is set. Leave it null if DNS for
# site_domain is not in this account — the certificate is still created, and its validation
# records have to be added wherever DNS actually lives.
resource "aws_route53_record" "certificate_validation" {
  for_each = var.hosted_zone_id == null ? {} : {
    for option in aws_acm_certificate.site.domain_validation_options : option.domain_name => {
      name   = option.resource_record_name
      record = option.resource_record_value
      type   = option.resource_record_type
    }
  }

  zone_id         = var.hosted_zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  ttl             = 60
  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "site" {
  count    = var.hosted_zone_id == null ? 0 : 1
  provider = aws.us_east_1

  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for record in aws_route53_record.certificate_validation : record.fqdn]
}

resource "aws_route53_record" "site" {
  # Written as a filtered map rather than a conditional over toset(), because both branches
  # of a conditional must share a type and an empty object does not unify with a set.
  for_each = { for record_type in ["A", "AAAA"] : record_type => record_type if var.hosted_zone_id != null }

  zone_id = var.hosted_zone_id
  name    = var.site_domain
  type    = each.value

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
