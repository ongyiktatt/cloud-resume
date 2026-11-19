# Certificate for S3 bucket
resource "aws_acm_certificate" "site" {
  domain_name               = var.domain_name
  region                    = var.aws_region
  subject_alternative_names = [var.domain_name]
  validation_method         = "DNS"
}
# Wildcard certificate for domain
resource "aws_acm_certificate" "domain_wildcard" {
  domain_name               = var.domain_name
  region                    = "us-east-1"
  subject_alternative_names = [var.domain_name, "*.${var.domain_name}"]
}