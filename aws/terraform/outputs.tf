# Outputs that contain account-scoped values are normal Terraform outputs, so they appear in
# plan output and in the state file — neither of which is committed. Do not paste them into
# the repository, the README or any other committed file.

output "bucket_name" {
  description = "Bucket GitHub Actions syncs the export into."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "Distribution to invalidate after a deploy."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "CloudFront domain, useful before DNS is pointed at it."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "contact_form_function_url" {
  description = "Function URL the contact form posts to."
  value       = aws_lambda_function_url.contact_form.function_url
}

output "sns_topic_arn" {
  description = "Topic contact form submissions are published to."
  value       = aws_sns_topic.contact_form.arn
}

output "deploy_role_arn" {
  description = "Role the deploy job assumes over OIDC."
  value       = aws_iam_role.deploy.arn
}

# The handoff between infrastructure and CI. Every one of these is a repository variable
# under Settings > Secrets and variables > Actions > Variables; the workflow reads them and
# holds no literals of its own.
output "github_actions_variables" {
  description = "Values for the repository variables the deploy workflow expects."
  value = {
    AWS_REGION                 = var.aws_region
    AWS_DEPLOY_ROLE_ARN        = aws_iam_role.deploy.arn
    S3_BUCKET                  = "s3://${aws_s3_bucket.site.bucket}"
    CLOUDFRONT_DISTRIBUTION_ID = aws_cloudfront_distribution.site.id
    CONTACT_VERIFY_URL         = aws_lambda_function_url.contact_form.function_url
  }
}
