resource "aws_sns_topic" "contact_form" {
  name = var.sns_topic_name
}

# Terraform can create the subscription but cannot confirm it. SNS mails the address a
# Subscription Confirmation link, and until a human clicks it the subscription stays
# PendingConfirmation and every message published before then is dropped — the contact form
# will report success while nothing is delivered.
#
# Check it with:
#
#   aws sns list-subscriptions-by-topic --topic-arn <topic-arn> --region <region> \
#     --query 'Subscriptions[].[Endpoint,SubscriptionArn]' --output json
resource "aws_sns_topic_subscription" "contact_form_email" {
  topic_arn = aws_sns_topic.contact_form.arn
  protocol  = "email"
  endpoint  = var.notification_email
}
