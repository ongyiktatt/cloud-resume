# GitHub Actions authenticates with a short-lived OIDC token, so no long-lived AWS keys
# exist in the repository. An account can hold only one provider per URL: if
# token.actions.githubusercontent.com is already registered (it is, if the deploy workflow
# has ever run), import it rather than letting Terraform try to create a second one.
#
#   terraform import aws_iam_openid_connect_provider.github \
#     arn:aws:iam::<account-id>:oidc-provider/token.actions.githubusercontent.com
resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]

  # thumbprint_list is deliberately omitted. AWS no longer requires it for GitHub's
  # provider, and pinning the certificate chain means maintaining a value that rotates.
}

resource "aws_iam_role" "deploy" {
  name = var.deploy_role_name

  # Scoped to one repository and one branch. The subject is an exact match, so a pull
  # request or a tag cannot assume this role — only a push to the named branch can.
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = { Federated = aws_iam_openid_connect_provider.github.arn }
        Action    = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repository}:ref:refs/heads/${var.github_branch}"
          }
        }
      },
    ]
  })
}

# Least privilege: the object operations `aws s3 sync --delete` needs on this one bucket,
# plus invalidation of this one distribution. Nothing else.
resource "aws_iam_role_policy" "deploy" {
  name = "deploy-permissions"
  role = aws_iam_role.deploy.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:ListBucket"]
        Resource = aws_s3_bucket.site.arn
      },
      {
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:DeleteObject"]
        Resource = "${aws_s3_bucket.site.arn}/*"
      },
      {
        Effect   = "Allow"
        Action   = ["cloudfront:CreateInvalidation"]
        Resource = aws_cloudfront_distribution.site.arn
      },
    ]
  })
}
