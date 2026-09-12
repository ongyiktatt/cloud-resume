terraform {
  required_version = ">= 1.9.0"

  required_providers {
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.8"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.64"
    }
  }

  # State is local until a backend is configured. Neither the state file nor a tfvars file
  # may be committed: state records account-scoped IDs, resource ARNs and the reCAPTCHA
  # secret in plain text, and this repository is public. Both are gitignored.
  #
  # Configure a remote backend at init time rather than editing this block:
  #
  #   terraform init -backend-config=backend.hcl
  #
  # backend "s3" {}
}
