---
description: "Use when working on AWS infrastructure for this site: Lambda contact form, S3/CloudFront hosting, WAF, security headers, IAM roles, deployments, or any aws CLI command."
applyTo: "aws/**"
---

# AWS infrastructure

Deployment mechanics and the Lambda handler are documented in
[`aws/recaptcha-verify/README.md`](../../aws/recaptcha-verify/README.md) — read it
first. This file records the live-resource facts and account constraints that are
**not** discoverable from the repository.

## Account and auth

- Account `<ACCOUNT_ID>`, region `ap-southeast-1` (Lambda, SNS, S3, IAM). CloudFront and its WAF ACL are global / `us-east-1`.
- **This file is committed to a public repository, so account-scoped values are placeholders.** Resolve them at runtime: `aws sts get-caller-identity --query Account --output text`, `aws lambda get-function-url-config --function-name recaptcha-verify`, `aws cloudfront list-distributions`, `aws wafv2 list-web-acls --scope CLOUDFRONT --region us-east-1`.
- The CLI uses `aws login` (short-lived credentials), not long-lived access keys. Expired sessions fail with `CreateOAuth2Token … authorization grant is invalid, expired, revoked, or malformed` — the fix is for the **user** to run `aws login` (browser-based). Never run it on their behalf.

## Live resources

| Resource              | Identifier                                                                        |
| --------------------- | --------------------------------------------------------------------------------- |
| Lambda                | `recaptcha-verify` (nodejs24.x, handler `index.handler`, **1024 MB**, timeout **15 s**) |
| Lambda Function URL    | `<your-function-url>` (AuthType `NONE`)                                            |
| Lambda execution role | `<LAMBDA_EXECUTION_ROLE>`                                                         |
| Deploy role           | `<DEPLOY_ROLE_NAME>` (GitHub OIDC, `repo:<owner>/cloud-resume:ref:refs/heads/main`) |
| SNS topic             | `arn:aws:sns:ap-southeast-1:<ACCOUNT_ID>:contact-form-notifications`               |
| S3 bucket             | `ongyiktatt.com-<account>-ap-southeast-1-an`                                        |
| CloudFront            | `<CLOUDFRONT_PROD_ID>` (ongyiktatt.com, prod-resume stack)                          |
| CloudFront            | `<CLOUDFRONT_AZURE_ID>` (azure.ongyiktatt.com — a **separate** `azure-prod-resume` stack) |
| WAF web ACL           | `CreatedByCloudFront-<suffix>` (`<WAF_WEB_ACL_ID>`), CLOUDFRONT scope               |

**Tagging convention:** `environment=production` + `stack=prod-resume` on the prod
resume resources. Do **not** tag `<CLOUDFRONT_AZURE_ID>` with `prod-resume` — it belongs to
the `azure-prod-resume` stack.

## Constraints worth knowing before changing anything

- **Do not lower the Lambda memory back to 256 MB.** Memory drives CPU, and the AWS SDK import dominates cold start: measured end-to-end 256 MB ≈ 1.96 s cold, 1024 MB ≈ 0.93 s cold / ~0.08 s warm. The default 3 s timeout is also too low.
- **Reserved concurrency cannot be set on this account.** The *Concurrent executions* quota is applied at **10** while the AWS default is **1000** (new-account ramp). `put-function-concurrency` fails with "decreases account's UnreservedConcurrentExecution below its minimum value of [10]", and Service Quotas rejects any request that isn't above the default. Needs an AWS Support case or the automatic ramp.
- **CloudFront is on the Free pricing plan.** It *rejects* custom response-headers policies ("Distributions with the Free pricing plan can't have the following features: Custom response headers policy"). Managed policies *are* allowed: the distribution uses `Managed-SecurityHeadersPolicy` plus a CloudFront Function (`prod-resume-response-headers`, `viewer-response`) for `content-security-policy` and `permissions-policy`. CloudFront's `SecurityHeadersConfig` has no Permissions-Policy field at all.
- **The Free-plan `CreatedByCloudFront-*` WAF ACL *is* editable** via `wafv2 update-web-acl` (unlike custom response-headers policies). Rules: AWS-managed IP reputation / common / known-bad-inputs, plus a `RateLimitPerIp` rate-based rule (Limit 1000, 300 s window, IP aggregate key, Block). Re-fetch the ACL for a fresh `LockToken` before each update and omit empty optional fields — a zero-length `Description` is rejected.
- **WAF changes take a few minutes to propagate.** An immediate test after an update can show 200s while the rule is already correct. Don't diagnose a broken rule from a burst fired immediately after the change.
- **The WAF rate rule does not protect the contact form**: the form POSTs directly to the Lambda Function URL, bypassing CloudFront entirely.
- **CORS lives in exactly one place** — the Function URL `--cors` config. Never set `Access-Control-Allow-Origin` in the handler; doing so makes Lambda emit the header twice and browsers reject the response. The Function URL answers `OPTIONS` preflights itself.
- A public Function URL needs **both** `lambda:InvokeFunctionUrl` (with `--function-url-auth-type NONE`) **and** `lambda:InvokeFunction` (with `--invoked-via-function-url`). Missing either returns `403 Forbidden`. `--function-url-auth-type` is rejected on `lambda:InvokeFunction`.

## Churn avoidance

- Build the deployment zip in `/tmp` (`zip -q /tmp/function.zip index.mjs`), not in the repo — otherwise `function.zip` dirties the working tree.
- `aws lambda create-function` can fail with "role cannot be assumed by Lambda" right after creating the role (IAM propagation). Retry before troubleshooting.
- Deleting and recreating the Function URL changes its hostname — update `src/config.ts`, `.env.local` and the CI variable together.
- `aws cloudfront create-function --function-code` requires **raw base64**; the `fileb64://` prefix is not supported by this CLI.
