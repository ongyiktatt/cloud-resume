variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-1"
}
variable "recaptcha_secret_key" {
  description = "Secret key for ReCAPTCHA"
  type        = string
  sensitive   = true
}
variable "s3_bucket_name" {
  description = "Bucket name for S3"
  type        = string
}
variable "sns_contact_form_recipient_1" {
  description = "SNS contact form recipient #1"
  type        = string
}
variable "domain_name" {
  description = "Domain name for the website"
  type        = string
}
variable "additional_tags" {
  description = "Overriding tags"
  type        = map(string)
  default     = {}
}