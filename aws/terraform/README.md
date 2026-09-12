# Terraform — cloud-resume AWS stack

Infrastructure as code for everything the site runs on: the S3 bucket and CloudFront
distribution that serve the export, the edge security around them, the contact form's
Lambda and SNS topic, and the OIDC role GitHub Actions deploys with.

This is a **root configuration**, not a published module — it takes variables and applies
them directly. The prosaic runbook it reproduces is
[`aws/recaptcha-verify/README.md`](../recaptcha-verify/README.md); where the two disagree,
that runbook describes what is actually deployed today.

## Layout

| File | Contains |
| --- | --- |
| `versions.tf` | Terraform and provider version constraints |
| `providers.tf` | Default provider, plus the `us_east_1` alias CloudFront requires |
| `variables.tf` | Every input, grouped into required and optional |
| `locals.tf` | Tagging convention and the CORS origin list |
| `s3.tf` | Bucket, public-access block, encryption, CloudFront-only bucket policy |
| `cloudfront.tf` | OAC, response-headers function, distribution |
| `waf.tf` | Web ACL: three AWS managed rule groups plus a per-IP rate limit |
| `acm.tf` | Certificate, DNS validation records, A/AAAA alias records |
| `lambda.tf` | Function, execution role, Function URL, invoke permissions |
| `sns.tf` | Topic and the email subscription |
| `iam.tf` | GitHub OIDC provider and the deploy role |
| `outputs.tf` | Resource identifiers, including the CI variable values |
| `files/response-headers.js` | CloudFront Function source for CSP and Permissions-Policy |

## There is no tfvars file, on purpose

This repository is public, so the values that identify the account — the bucket name, role
names, the notification address — are **inputs, never literals**. Nothing in this directory
carries an account ID, ARN, bucket name, distribution ID or Function URL.

Create a `terraform.tfvars` locally, or pass the values as `TF_VAR_*` environment
variables. It is gitignored, and so is the state file: state records ARNs, resource
identifiers and the reCAPTCHA secret in plain text.

Five inputs are required and have no defaults, because a guessed default would create a
second, divergent set of resources instead of adopting the live ones:

`bucket_name`, `lambda_execution_role_name`, `deploy_role_name`, `notification_email`,
`recaptcha_secret_key`.

For the secret in particular, prefer the environment over a file:

```bash
export TF_VAR_recaptcha_secret_key=...
```

## Usage

```bash
cd aws/terraform
terraform init            # add -backend-config=backend.hcl for a remote backend
terraform validate
terraform plan -out=tfplan
terraform apply tfplan
```

Point DNS at the distribution, then read the handoff values for CI:

```bash
terraform output github_actions_variables
```

Set them under **Settings → Secrets and variables → Actions → Variables**. The workflow
reads only repository variables, so no account-scoped value is ever committed.

## Adopting the resources that already exist

This configuration describes a stack that is already running. `terraform plan` will
initially want to *create* everything; the resources exist, so they need importing first.
Work through the plan — it names the offending addresses.

```bash
terraform import aws_s3_bucket.site                              <bucket-name>
terraform import aws_cloudfront_distribution.site                <distribution-id>
terraform import aws_cloudfront_origin_access_control.site       <oac-id>
terraform import aws_cloudfront_function.response_headers        prod-resume-response-headers
terraform import aws_lambda_function.contact_form                recaptcha-verify
terraform import aws_lambda_function_url.contact_form            recaptcha-verify
terraform import aws_iam_role.lambda_execution                  <lambda-execution-role>
terraform import aws_iam_role.deploy                             <deploy-role>
terraform import aws_iam_role_policy.sns_publish                 <role>:sns-publish-contact-form
terraform import aws_iam_role_policy.deploy                      <role>:deploy-permissions
terraform import aws_iam_openid_connect_provider.github          arn:aws:iam::<account>:oidc-provider/token.actions.githubusercontent.com
terraform import aws_sns_topic.contact_form                      <topic-arn>
terraform import aws_wafv2_web_acl.site[0]                       <acl-id>
terraform import aws_acm_certificate.site                        <certificate-arn>
```

Three of these are easy to get wrong:

- **The WAF web ACL.** On a Free pricing plan account CloudFront creates and associates a
  `CreatedByCloudFront-*` ACL itself. Rather than importing it, pass its ARN as
  `waf_web_acl_arn` — the `aws_wafv2_web_acl` resource then disappears from the plan and the
  existing association is left alone.
- **The CloudFront Function's code.** `files/response-headers.js` was reconstructed from the
  documentation of the live function, not read back from it. Diff it before applying:
  ```bash
  aws cloudfront get-function --name prod-resume-response-headers --stage LIVE \
    --query 'FunctionCode' --output text | base64 --decode
  ```
  A missing directive in the CSP breaks the reCAPTCHA widget on the live site.
- **The managed policy IDs** in `cloudfront.tf`. They are AWS-managed constants, so they are
  safe to commit, but confirm they match the live distribution:
  ```bash
  aws cloudfront get-distribution-config --id <distribution-id> \
    --query 'DistributionConfig.DefaultCacheBehavior.[CachePolicyId,ResponseHeadersPolicyId]'
  ```

## What Terraform cannot do here

Four things are handled outside this configuration, and none of them is an oversight:

- **Reserved concurrency.** The account's *Concurrent executions* quota is applied at 10
  (new-account ramp), below the AWS default of 1000, so any reservation is rejected. Set
  `reserved_concurrency` once a Support case or the automatic ramp lifts it. Today the
  applied quota of 10 is itself the ceiling.
- **SNS subscription confirmation.** Terraform creates the subscription, but SNS mails a
  confirmation link that a human has to click. Until then the subscription is
  `PendingConfirmation` and submissions are dropped while the form still reports success.
- **The CloudFront pricing plan.** The Free plan rejects custom response-headers policies,
  which is why CSP and Permissions-Policy are set by a CloudFront Function instead. The plan
  itself is not exposed by the provider.
- **GitHub repository variables.** Terraform outputs the values; setting them is a manual
  step in the repository settings.

## Not managed here

- **`azure.ongyiktatt.com`.** That distribution belongs to a separate `azure-prod-resume`
  stack. It must not be tagged with this stack's tags, and it must not be imported into this
  configuration.
- **The site content.** `out/` is produced by `yarn build` and synced by the deploy
  workflow, not by Terraform.
