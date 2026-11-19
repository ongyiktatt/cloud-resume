# Create a SNS topic for contact form
resource "aws_sns_topic" "contact_form_notifications" {
  name                             = "contact-form-notifications"
  region                           = var.aws_region
  sqs_success_feedback_sample_rate = 0
}
# IAM policy for the SNS topic
resource "aws_sns_topic_policy" "contact_form_notifications" {
  arn = aws_sns_topic.contact_form_notifications.arn
  policy = jsonencode({
    Id = "__default_policy_ID"
    Statement = [{
      Action = ["SNS:GetTopicAttributes", "SNS:SetTopicAttributes", "SNS:AddPermission", "SNS:RemovePermission", "SNS:DeleteTopic", "SNS:Subscribe", "SNS:ListSubscriptionsByTopic", "SNS:Publish"]
      Condition = {
        StringEquals = {
          "AWS:SourceOwner" = data.aws_caller_identity.current.account_id
        }
      }
      Effect = "Allow"
      Principal = {
        AWS = "*"
      }
      Resource = aws_sns_topic.contact_form_notifications.arn
      Sid      = "__default_statement_ID"
    }]
    Version = "2008-10-17"
  })
  region = "ap-southeast-1"
}
# Recipient for the SNS topic
resource "aws_sns_topic_subscription" "recipient_1" {
  confirmation_timeout_in_minutes = 30
  endpoint                        = var.sns_contact_form_recipient_1
  protocol                        = "email"
  region                          = var.aws_region
  topic_arn                       = aws_sns_topic.contact_form_notifications.arn
}