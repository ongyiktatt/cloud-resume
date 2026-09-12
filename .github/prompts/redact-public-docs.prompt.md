---
description: "Audit the repo's committed files for AWS account identifiers, resource names, endpoints and notification addresses, then replace them with runtime-resolvable placeholders. Use before making the repository public or after adding infrastructure docs."
agent: "agent"
---

This repository is **public**, so every committed value is world-readable. Scan the
committed files for anything that identifies the AWS account or private infrastructure
and replace each hit with a placeholder.

Read `.github/instructions/aws-infrastructure.instructions.md` first — it defines the
placeholder convention and the aws CLI commands that resolve each value at runtime.

## What counts as identifying

- 12-digit AWS account ids, including the ones embedded in an ARN
  (`arn:aws:sns:<region>:<ACCOUNT_ID>:…`).
- IAM role names and ARNs, S3 bucket names, CloudFront distribution ids, WAF web ACL ids,
  Lambda Function URLs.
- The SNS notification address — the mailbox behind the `contact-form-notifications` topic.

**Do not redact the résumé's own contact details** in `src/data/data.tsx`. That address is
published on the live site deliberately. Everything under `src/data/` is site content, not
infrastructure.

## Where to look

`**/*.md`, `.github/workflows/**`, `src/config.ts`, `.env.example`, `aws/**/*.json`.

## How to replace

- Use the `<PLACEHOLDER>` convention and name the CLI command that resolves it (as the
  instruction file does) so the value stays discoverable.
- Keep the file valid: a replaced ARN must still be a parseable ARN, and JSON/YAML must
  still parse.
- Do not leak the real value in a nearby comment or a "for example" either.

## Report

Return a table of every hit — file, line, category, and the placeholder it became. Explicitly
call out any value that **cannot** be parameterised because CI, the trust policy or the deploy
runbook depends on the literal, instead of silently changing it.
