# Role for GitHub Actions to deploy to S3 and invalidate CloudFront cache
resource "aws_iam_role" "github_actions_deploy_role" {
  assume_role_policy = jsonencode({
    Statement = [{
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          "token.actions.githubusercontent.com:sub" = "repo:ongyiktatt@54128924/cloud-resume@1363596313:ref:refs/heads/main"
        }
      }
      Effect = "Allow"
      Principal = {
        Federated = aws_iam_openid_connect_provider.github.arn
      }
    }]
    Version = "2012-10-17"
  })
  # force_detach_policies = false
  # max_session_duration  = 3600
  name = "github-actions-deploy-role"
  path = "/"
}
# Policy for GitHub Actions to deploy to S3 and invalidate CloudFront cache
resource "aws_iam_role_policy" "github_actions_deploy_policy" {
  name = "deploy-permissions"
  role = aws_iam_role.github_actions_deploy_role.id
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "S3Sync",
        "Effect" : "Allow",
        "Action" : [
          "s3:PutObject",
          "s3:GetObject",
          "s3:ListBucket",
          "s3:DeleteObject"
        ],
        "Resource" : [
          aws_s3_bucket.site.arn,
          "${aws_s3_bucket.site.arn}/*"
        ]
      },
      {
        "Sid" : "CloudFrontInvalidation",
        "Effect" : "Allow",
        "Action" : "cloudfront:CreateInvalidation",
        "Resource" : aws_cloudfront_distribution.site.arn
      }
    ]
  })
}
# Role for reCAPTCHA verification Lambda function
resource "aws_iam_role" "recaptcha_verify_role" {
  assume_role_policy = jsonencode({
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
    Version = "2012-10-17"
  })
  description = "Execution role for the reCAPTCHA verification Lambda"
  # force_detach_policies = false
  # max_session_duration  = 3600
  name = "recaptcha-verify-role"
  path = "/"
}
# Policy for reCAPTCHA verification Lambda function to publish to SNS
resource "aws_iam_role_policy" "recaptcha_verify_policy" {
  name = "sns-publish-contact-form"
  policy = jsonencode({
    Statement = [{
      Action   = "sns:Publish"
      Effect   = "Allow"
      Resource = aws_sns_topic.contact_form_notifications.arn
      Sid      = "PublishContactFormNotifications"
    }]
    Version = "2012-10-17"
  })
  role = aws_iam_role.recaptcha_verify_role.id
}
# Attach AWSLambdaBasicExecutionRole policy to the reCAPTCHA verification Lambda role
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.recaptcha_verify_role.id
}
# OIDC provider for GitHub Actions
resource "aws_iam_openid_connect_provider" "github" {
  client_id_list = ["sts.amazonaws.com"]
  # thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1", "1c58a3a8518e8759bf075b76b750d4f2df264fcd"]
  url = "https://token.actions.githubusercontent.com"
}