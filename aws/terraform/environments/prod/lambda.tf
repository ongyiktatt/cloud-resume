# Zip the JavaScript file for reCAPTCHA
data "archive_file" "recaptcha_verify" {
  type        = "zip"
  source_file = "${path.module}/lambda/index.mjs"
  output_path = "${path.module}/build/recaptcha-verify.zip"
}
# Setup lambda function for reCAPTCHA function
resource "aws_lambda_function" "recaptcha_verify" {
  architectures                  = ["x86_64"]
  description                    = "Contact form backend: verifies reCAPTCHA tokens and publishes submissions to SNS"
  filename                       = data.archive_file.recaptcha_verify.output_path
  source_code_hash               = data.archive_file.recaptcha_verify.output_base64sha256
  function_name                  = "recaptcha-verify"
  handler                        = "index.handler"
  memory_size                    = 1024
  package_type                   = "Zip"
  publish                        = true
  region                         = "ap-southeast-1"
  reserved_concurrent_executions = -1
  role                           = aws_iam_role.recaptcha_verify_role.arn
  runtime                        = "nodejs24.x"
  skip_destroy                   = false
  timeout                        = 15
  environment {
    variables = {
      RECAPTCHA_SECRET_KEY = var.recaptcha_secret_key
      SNS_TOPIC_ARN        = aws_sns_topic.contact_form_notifications.arn
    }
  }
  ephemeral_storage {
    size = 512
  }
  logging_config {
    log_format = "Text"
    log_group  = "/aws/lambda/recaptcha-verify"
  }
}
