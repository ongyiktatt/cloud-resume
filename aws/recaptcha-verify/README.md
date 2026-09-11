# Contact form Lambda

Backend for the site's Get In Touch form. The browser sends the form fields along with
the reCAPTCHA token to this function, which:

1. verifies the token by calling Google's `siteverify` endpoint with the secret key, and
2. when the token is valid, publishes the submission to an SNS topic, which emails it to
   the subscribed address.

It returns `{ "success": true }` only when both steps succeed.

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

Set the environment variables:

```bash
cat > /tmp/lambda-env.json <<'JSON'
{
  "FunctionName": "recaptcha-verify",
  "Environment": {
    "Variables": {
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

The `--cors` block above is the **only** place CORS is configured. Do not also set
`Access-Control-Allow-Origin` in the handler — see the note in [Notes](#notes).

Smoke test — a dummy token should come back as `invalid-input-response`, **not**
`invalid-input-secret` (which would mean the secret is wrong):

```bash
curl -X POST -H 'Content-Type: application/json' \
  -d '{"token":"dummy"}' \
  https://<your-function-url>/
```

Copy the `FunctionUrl` from the output and set it for the site (see step 5).

## 4. Set up SNS email notifications

Create a topic, then subscribe the address that should receive contact form messages:

```bash
aws sns create-topic --name contact-form-notifications --region ap-southeast-1
# -> copy the TopicArn from the output

aws sns subscribe \
  --topic-arn arn:aws:sns:ap-southeast-1:664608326292:contact-form-notifications \
  --protocol email \
  --notification-endpoint ytong95@gmail.com \
  --region ap-southeast-1
```

> **The subscription must be confirmed.** SNS emails a *Subscription Confirmation*
> message to that address, and the recipient has to click **Confirm subscription**
> before any contact form messages are delivered. Messages published before
> confirmation are dropped.

Check the subscription status with:

```bash
aws sns list-subscriptions-by-topic \
  --topic-arn arn:aws:sns:ap-southeast-1:664608326292:contact-form-notifications \
  --region ap-southeast-1 \
  --query 'Subscriptions[].[Endpoint,SubscriptionArn]' --output json
```

`PendingConfirmation` means it hasn't been confirmed yet.

Grant the function permission to publish to that topic:

```bash
aws iam put-role-policy \
  --role-name recaptcha-verify-role \
  --policy-name sns-publish-contact-form \
  --policy-document file://sns-publish-policy.json
```

Then add the topic ARN to the function's environment. Include the existing variables as
well — this call replaces the whole variable set:

```bash
cat > /tmp/lambda-env.json <<'JSON'
{
  "FunctionName": "recaptcha-verify",
  "Timeout": 15,
  "Environment": {
    "Variables": {
      "RECAPTCHA_SECRET_KEY": "<your-secret-key>",
      "SNS_TOPIC_ARN": "arn:aws:sns:ap-southeast-1:664608326292:contact-form-notifications"
    }
  }
}
JSON

aws lambda update-function-configuration \
  --cli-input-json file:///tmp/lambda-env.json \
  --region ap-southeast-1

rm -f /tmp/lambda-env.json
```

> `Timeout` is raised from the 3 second default. The AWS SDK v3 that ships with the
> Node.js runtime is imported at start-up (~2s on a cold start), which does not fit
> inside 3s.

## 5. Point the site at the function

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
- Nothing is published to SNS unless Google confirms the reCAPTCHA token, so the public
  Function URL can't be used to email you without first solving a challenge.
- SNS email notifications have no `Reply-To` header. The sender's address is included in
  the message body — switch to Amazon SES if you want to reply directly from your inbox.
- Test delivery independently of the website with:

  ```bash
  aws sns publish \
    --topic-arn arn:aws:sns:ap-southeast-1:664608326292:contact-form-notifications \
    --subject "Test" --message "Test message" \
    --region ap-southeast-1
  ```
- Rotate the secret key in the [reCAPTCHA admin console](https://www.google.com/recaptcha/admin)
  if it has ever been shared or committed, then update the Lambda's
  `RECAPTCHA_SECRET_KEY` environment variable.
- To update the code later: `rm -f function.zip && zip -q function.zip index.mjs` then
  `aws lambda update-function-code --function-name recaptcha-verify --zip-file fileb://function.zip --region ap-southeast-1`
  followed by `aws lambda wait function-updated --function-name recaptcha-verify --region ap-southeast-1`.
- **CORS is configured in exactly one place: the Function URL's `--cors` setting.**
  The handler must not set `Access-Control-Allow-Origin`. If it does, Lambda emits the
  header twice and browsers reject the response with
  *"the 'Access-Control-Allow-Origin' header contains multiple values"*, which surfaces
  as a failed form submission. The Function URL also answers `OPTIONS` preflights on its
  own, without invoking the function.
- The IP address of the caller is forwarded to Google as `remoteip`.
