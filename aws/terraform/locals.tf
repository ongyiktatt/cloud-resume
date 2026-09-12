locals {
  account_id = data.aws_caller_identity.current.account_id

  # Tagging convention from .github/instructions/aws-infrastructure.instructions.md.
  #
  # The azure.ongyiktatt.com distribution is NOT part of this stack. It belongs to a
  # separate azure-prod-resume stack and must not be tagged with these values, nor managed
  # from this configuration.
  tags = {
    environment = "production"
    stack       = var.stack_name
  }

  # The contact form POSTs straight to the Lambda Function URL, so the *browser* origin is
  # what CORS has to allow. Those requests never pass through CloudFront, which is also why
  # the WAF rate rule on the distribution does not see them.
  site_origins = distinct(concat(["https://${var.site_domain}"], var.additional_site_origins))
}
