# ---------------------------------------------------------------------------------------
# Required — these identify resources that already exist.
#
# They have no defaults on purpose. A guessed default would quietly create a second,
# divergent set of resources instead of adopting the live ones, and they are exactly the
# values that must never be committed, because this repository is public.
#
# Supply them through a tfvars file that is kept out of git, or through TF_VAR_*
# environment variables.
# ---------------------------------------------------------------------------------------

variable "bucket_name" {
  description = "Globally unique S3 bucket that holds the exported site."
  type        = string
}

variable "lambda_execution_role_name" {
  description = "Name of the contact form Lambda's execution role."
  type        = string
}

variable "deploy_role_name" {
  description = "Name of the role GitHub Actions assumes over OIDC to deploy the site."
  type        = string
}

variable "notification_email" {
  description = "Mailbox that receives contact form submissions. The SNS subscription has to be confirmed by hand — see the README."
  type        = string
}

variable "recaptcha_secret_key" {
  description = "reCAPTCHA v2 secret key, read by the Lambda only. Prefer TF_VAR_recaptcha_secret_key in the environment over a tfvars file, since the value also lands in plain text in the state file."
  type        = string
  sensitive   = true
}

# ---------------------------------------------------------------------------------------
# Optional — defaults reproduce the live stack. Check them against what is deployed before
# adopting existing resources, because changing one is a real infrastructure change.
# ---------------------------------------------------------------------------------------

variable "aws_region" {
  description = "Region for the regional resources (S3, Lambda, SNS, IAM). CloudFront and its web ACL are global; the ACM certificate is always us-east-1."
  type        = string
  default     = "ap-southeast-1"
}

variable "stack_name" {
  description = "Value for the stack tag."
  type        = string
  default     = "prod-resume"
}

variable "site_domain" {
  description = "Apex domain the site is served from."
  type        = string
  default     = "ongyiktatt.com"
}

variable "certificate_alternative_names" {
  description = "Extra names on the ACM certificate, for example [\"www.ongyiktatt.com\"]. Empty by default: the live certificate covers the apex only."
  type        = list(string)
  default     = []
}

variable "hosted_zone_id" {
  description = "Route 53 hosted zone holding site_domain. When set, Terraform also creates the ACM validation records and the A/AAAA alias records. Leave null when DNS lives elsewhere — the certificate and distribution are still created, and DNS is wired up by hand."
  type        = string
  default     = null
}

variable "lambda_function_name" {
  description = "Name of the contact form Lambda function."
  type        = string
  default     = "recaptcha-verify"
}

variable "lambda_memory_size" {
  description = "Memory in MB, which also determines CPU. Do not lower this: the AWS SDK import dominates the cold start, so 256 MB measured ~1.96 s cold against ~0.93 s at 1024 MB."
  type        = number
  default     = 1024
}

variable "lambda_timeout" {
  description = "Timeout in seconds. The 3 s default does not cover a cold start."
  type        = number
  default     = 15
}

variable "reserved_concurrency" {
  description = "Reserved concurrency for the contact form function, the backstop for a public Function URL. Left null because the account's Concurrent executions quota is currently applied at 10, which is below the AWS default of 1000, so Lambda rejects any reservation."
  type        = number
  default     = null
}

variable "sns_topic_name" {
  description = "Name of the SNS topic contact form submissions are published to."
  type        = string
  default     = "contact-form-notifications"
}

variable "additional_site_origins" {
  description = "Extra origins allowed by the Function URL's CORS configuration. CORS is configured there and nowhere else — never in the handler."
  type        = list(string)
  default     = ["http://localhost:3000"]
}

variable "github_repository" {
  description = "owner/name of the repository allowed to assume the deploy role."
  type        = string
  default     = "ongyiktatt/cloud-resume"
}

variable "github_branch" {
  description = "Branch whose OIDC subject may assume the deploy role."
  type        = string
  default     = "main"
}

variable "price_class" {
  description = "CloudFront price class. Confirm against the live distribution before adopting it."
  type        = string
  default     = "PriceClass_All"
}

variable "minimum_protocol_version" {
  description = "Minimum TLS version CloudFront accepts from viewers."
  type        = string
  default     = "TLSv1.2_2021"
}

variable "waf_rate_limit" {
  description = "Requests per IP per 300 s window before the rate-based rule blocks. The window is fixed by the API."
  type        = number
  default     = 1000
}

variable "waf_web_acl_arn" {
  description = "ARN of an existing web ACL to associate instead of creating one, such as the CreatedByCloudFront-* ACL CloudFront creates on the Free pricing plan. Leave null to have Terraform create and manage its own."
  type        = string
  default     = null
}
