terraform {
  required_version = "1.17.2"
  cloud {
    organization = "ongyiktatt"
    workspaces {
      name = "cloud-resume"
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 6.73.0"
    }
    # Needed for zipping JavaScript source code for Lambda function
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.7"
    }
  }
}
provider "aws" {
  region = var.aws_region
  # Apply tags to all managed resources
  default_tags {
    tags = local.default_tags
  }
}
# Create a us-east-1 alias for global resources
provider "aws" {
  alias  = "us-east-1"
  region = "us-east-1"
  default_tags {
    tags = local.default_tags
  }
}
locals {
  # Common tags to tag the resource created by this Terraform
  common_tags = {
    env        = "prod"
    stack      = "prod-resume"
    managed_by = "terraform"
  }
  origin_id = "s3-site"
  # Merge common tags and additional tags in variables.tf
  default_tags = merge(local.common_tags, var.additional_tags)
}