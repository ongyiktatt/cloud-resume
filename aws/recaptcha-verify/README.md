# reCAPTCHA verification Lambda

Server-side verification for the reCAPTCHA v2 widget in the site's Get In Touch form.
The browser sends the reCAPTCHA token to this function, which calls Google's
`siteverify` endpoint with the secret key and returns `{ "success": true }` only when
the token is valid.

## 1. Create the execution role

The function needs an IAM role that Lambda is allowed to assume. Create it once:

```bash
cd aws/recaptcha-verify

aws iam create-role \
  --role-name recaptcha-verify-role \
  --assume-role-policy-document file://trust-policy.json

aws iam attach-role-policy \
  --role-name recaptcha-verify-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

> If `create-function` fails with *"The role defined for the function cannot be
> assumed by Lambda"*, either the role is missing or its trust policy doesn't allow
> `lambda.amazonaws.com`. A newly created role can also take a few seconds to
> propagate — retry before troubleshooting further.

## 2. Create the function

```bash
cd aws/recaptcha-verify
rm -f function.zip && zip -q function.zip index.mjs

aws lambda create-function \
  --function-name recaptcha-verify \
  --runtime nodejs20.x \
  --handler index.handler \
  --role arn:aws:iam::664608326292:role/recaptcha-verify-role \
  --zip-file fileb://function.zip \
  --region ap-southeast-1

aws lambda wait function-active --function-name recaptcha-verify --region ap-southeast-1
```

Set the environment variables. Use a JSON file so the comma-separated
`ALLOWED_ORIGIN` isn't mangled by the CLI shorthand syntax:

```bash
cat > /tmp/lambda-env.json <<'JSON'
{
  "FunctionName": "recaptcha-verify",
  "Environment": {
    "Variables": {
      "ALLOWED_ORIGIN": "https://ongyiktatt.com,http://localhost:3000",
      "RECAPTCHA_SECRET_KEY": "<your-secret-key>"
    }
  }
}
JSON

aws lambda update-function-configuration \
  --cli-input-json file:///tmp/lambda-env.json \
  --region ap-southeast-1

rm -f /tmp/lambda-env.json
```

## 3. Expose it with a Function URL

An unauthenticated (`NONE`) function URL requires **two** resource-based policy
statements: `lambda:InvokeFunctionUrl` *and* `lambda:InvokeFunction`. Missing either
one returns `403 Forbidden` even though the auth type is `NONE`.

```bash
aws lambda create-function-url-config \
  --function-name recaptcha-verify \
  --auth-type NONE \
  --cors '{"AllowOrigins":["https://ongyiktatt.com","http://localhost:3000"],"AllowMethods":["POST"],"AllowHeaders":["Content-Type"],"MaxAge":86400}' \
  --region ap-southeast-1

aws lambda add-permission \
  --function-name recaptcha-verify \
  --statement-id FunctionURLAllowPublicAccess \
  --action lambda:InvokeFunctionUrl \
  --principal "*" \
  --function-url-auth-type NONE \
  --region ap-southeast-1

aws lambda add-permission \
  --function-name recaptcha-verify \
  --statement-id FunctionURLInvokeAllowPublicAccess \
  --action lambda:InvokeFunction \
  --principal "*" \
  --invoked-via-function-url \
  --region ap-southeast-1
```

Smoke test — a dummy token should come back as `invalid-input-response`, **not**
`invalid-input-secret` (which would mean the secret is wrong):

```bash
curl -X POST -H 'Content-Type: application/json' \
  -d '{"token":"dummy"}' \
  https://<your-function-url>/
```

Copy the `FunctionUrl` from the output (e.g. `https://abcd1234.lambda-url.ap-southeast-1.on.aws/`)
and set it as `NEXT_PUBLIC_CONTACT_VERIFY_URL` for the site (see below).

## 4. Point the site at the function

`src/config.ts` falls back to the deployed Function URL, so no configuration is
strictly required. To point the site at a **different** URL, set
`NEXT_PUBLIC_CONTACT_VERIFY_URL`:

- Local development — add to `.env.local` (gitignored):

  ```
  NEXT_PUBLIC_CONTACT_VERIFY_URL=https://6z2mcyqkmz6sqzmxzbcol7ejum0bjuoh.lambda-url.ap-southeast-1.on.aws/
  ```

- GitHub Actions — optionally add a repository variable named `CONTACT_VERIFY_URL`.
  It is passed to `yarn build` in `.github/workflows/main.yml`.

> If you delete and recreate the function URL, the hostname changes. Update the
> fallback in `src/config.ts` (and `.env.local`) to match.

## Notes

- The secret key is only ever read by this function. It must never be committed
  or placed in any `NEXT_PUBLIC_*` variable.
- Rotate the secret key in the [reCAPTCHA admin console](https://www.google.com/recaptcha/admin)
  if it has ever been shared or committed, then update the Lambda's
  `RECAPTCHA_SECRET_KEY` environment variable.
- To update the code later: `rm -f function.zip && zip -q function.zip index.mjs` then
  `aws lambda update-function-code --function-name recaptcha-verify --zip-file fileb://function.zip --region ap-southeast-1`
  followed by `aws lambda wait function-updated --function-name recaptcha-verify --region ap-southeast-1`.
- `ALLOWED_ORIGIN` accepts a comma-separated list. The first entry is used as the
  fallback for unrecognised origins.
- The IP address of the caller is forwarded to Google as `remoteip`.
