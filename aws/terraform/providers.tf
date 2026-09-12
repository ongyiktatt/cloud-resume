provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.tags
  }
}

# CloudFront is global, but two of the things that hang off it are not: an ACM certificate
# used by a distribution must live in us-east-1, and a CLOUDFRONT-scope WAF web ACL can only
# be created there. This alias exists for those resources alone.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = local.tags
  }
}

data "aws_caller_identity" "current" {}
