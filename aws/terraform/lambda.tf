# The handler lives beside this configuration in the repository, so the deployment package
# is built from source rather than from a zip that has to be produced by hand.
#
# The archive is written under .build/ and never committed: it is a derived artefact, and
# committing it would make source_code_hash drift from the code it describes.
data "archive_file" "contact_form" {
  type        = "zip"
  source_file = "${path.module}/../recaptcha-verify/index.mjs"
  output_path = "${path.module}/.build/function.zip"
}

resource "aws_iam_role" "lambda_execution" {
  name = var.lambda_execution_role_name

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = { Service = "lambda.amazonaws.com" }
        Action    = "sts:AssumeRole"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Grants publish rights on exactly one topic. The ARN is built from the topic resource, so
# no account-scoped value has to be committed here.
resource "aws_iam_role_policy" "sns_publish" {
  name = "sns-publish-contact-form"
  role = aws_iam_role.lambda_execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "PublishContactFormNotifications"
        Effect   = "Allow"
        Action   = "sns:Publish"
        Resource = aws_sns_topic.contact_form.arn
      },
    ]
  })
}

resource "aws_lambda_function" "contact_form" {
  function_name = var.lambda_function_name
  role          = aws_iam_role.lambda_execution.arn
  runtime       = "nodejs24.x"
  handler       = "index.handler"

  # Memory and timeout are sized from measured cold-start behaviour, not defaults. The
  # numbers live in the root README under "Function configuration".
  memory_size = var.lambda_memory_size
  timeout     = var.lambda_timeout

  filename         = data.archive_file.contact_form.output_path
  source_code_hash = data.archive_file.contact_form.output_base64sha256

  # Only these two. A static export has no server to hold a secret, and NEXT_PUBLIC_* values
  # are inlined into the bundle, so anything secret belongs here and nowhere else.
  environment {
    variables = {
      RECAPTCHA_SECRET_KEY = var.recaptcha_secret_key
      SNS_TOPIC_ARN        = aws_sns_topic.contact_form.arn
    }
  }

  reserved_concurrent_executions = var.reserved_concurrency
}

resource "aws_lambda_function_url" "contact_form" {
  function_name      = aws_lambda_function.contact_form.function_name
  authorization_type = "NONE"

  # CORS lives here and only here. Setting Access-Control-Allow-Origin in the handler makes
  # Lambda emit the header twice and browsers reject the response. The Function URL answers
  # OPTIONS preflights itself.
  cors {
    allow_credentials = false
    allow_headers     = ["content-type"]
    allow_methods     = ["POST"]
    allow_origins     = local.site_origins
    max_age           = 86400
  }
}

# A public Function URL needs BOTH statements. Missing either one returns 403 Forbidden even
# though the auth type is NONE, and function_url_auth_type is rejected on
# lambda:InvokeFunction.
resource "aws_lambda_permission" "function_url" {
  statement_id           = "FunctionURLAllowPublicAccess"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = aws_lambda_function.contact_form.function_name
  principal              = "*"
  function_url_auth_type = "NONE"
}

resource "aws_lambda_permission" "function_url_invoke" {
  statement_id             = "FunctionURLInvokeAllowPublicAccess"
  action                   = "lambda:InvokeFunction"
  function_name            = aws_lambda_function.contact_form.function_name
  principal                = "*"
  invoked_via_function_url = true
}
