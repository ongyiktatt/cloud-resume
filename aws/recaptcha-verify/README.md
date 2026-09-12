# Contact form Lambda

Backend for the site's Get In Touch form. The browser sends the form fields along with
the reCAPTCHA token to this function, which:

1. verifies the token by calling Google's `siteverify` endpoint with the secret key, and
2. when the token is valid, publishes the submission to an SNS topic, which emails it to
   the subscribed address.

It returns `{ "success": true }` only when both steps succeed.

In the commands below, `$ACCOUNT_ID` is your 12-digit AWS account ID, `<recipient-address>`
is the mailbox that should receive contact form messages, and `<lambda-execution-role>` is
the name of the function's execution role (any name works — use the same one throughout).
Set the account ID once per shell:

```bash
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
```

## 1. Create the execution role

The function needs an IAM role that Lambda is allowed to assume. Create it once:

```bash
cd aws/recaptcha-verify

aws iam create-role \
  --role-name <lambda-execution-role> \
  --assume-role-policy-document file://trust-policy.json

aws iam attach-role-policy \
  --role-name <lambda-execution-role> \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

> If `create-function` fails with *"The role defined for the function cannot be
> assumed by Lambda"*, either the role is missing or its trust policy doesn't allow
> `lambda.amazonaws.com`. A newly created role can also take a few seconds to
> propagate — retry before troubleshooting further.

## 2. Create the function

```bash
cd aws/recaptcha-verify
rm -f /tmp/function.zip && zip -q /tmp/function.zip index.mjs

aws lambda create-function \
  --function-name recaptcha-verify \
  --runtime nodejs24.x \
  --handler index.handler \
  --role arn:aws:iam::$ACCOUNT_ID:role/<lambda-execution-role> \
  --memory-size 1024 \
  --zip-file fileb:///tmp/function.zip \
  --region ap-southeast-1

aws lambda wait function-active --function-name recaptcha-verify --region ap-southeast-1
```

> **`--memory-size 1024` is not optional.** Lambda allocates CPU in proportion to memory,
> and the AWS SDK import dominates the cold start, so the 128 MB default makes the first
> request after a deploy roughly twice as slow. The measurements are in
> [Function configuration](../../README.md#function-configuration) in the root README —
> that is the single home for those numbers.
>
> **Optional:** `--architectures arm64` runs the function on Graviton, which is around
> 20% cheaper per GB-second and usually faster for Node. Changing architecture also
> changes the cold-start profile, so re-measure rather than assuming the current figures
> carry over.

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
  --topic-arn arn:aws:sns:ap-southeast-1:$ACCOUNT_ID:contact-form-notifications \
  --protocol email \
  --notification-endpoint <recipient-address> \
  --region ap-southeast-1
```

> **The subscription must be confirmed.** SNS emails a *Subscription Confirmation*
> message to that address, and the recipient has to click **Confirm subscription**
> before any contact form messages are delivered. Messages published before
> confirmation are dropped.

Check the subscription status with:

```bash
aws sns list-subscriptions-by-topic \
  --topic-arn arn:aws:sns:ap-southeast-1:$ACCOUNT_ID:contact-form-notifications \
  --region ap-southeast-1 \
  --query 'Subscriptions[].[Endpoint,SubscriptionArn]' --output json
```

`PendingConfirmation` means it hasn't been confirmed yet.

Grant the function permission to publish to that topic:

```bash
# sns-publish-policy.json is a template: `<ACCOUNT_ID>` is substituted here, at apply
# time, so the committed file never carries a real account ID. Render it to /tmp first —
# the AWS CLI would otherwise read the placeholder verbatim and reject the policy.
sed "s/<ACCOUNT_ID>/$ACCOUNT_ID/g" sns-publish-policy.json > /tmp/sns-publish-policy.json

aws iam put-role-policy \
  --role-name <lambda-execution-role> \
  --policy-name sns-publish-contact-form \
  --policy-document file:///tmp/sns-publish-policy.json

rm -f /tmp/sns-publish-policy.json
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
      "SNS_TOPIC_ARN": "arn:aws:sns:ap-southeast-1:$ACCOUNT_ID:contact-form-notifications"
    }
  }
}
JSON

aws lambda update-function-configuration \
  --cli-input-json file:///tmp/lambda-env.json \
  --region ap-southeast-1

rm -f /tmp/lambda-env.json
```

> `Timeout` is raised from the 3 second default: the AWS SDK v3 that ships with the
> Node.js runtime is imported at start-up, and that import alone does not fit inside 3 s.
> Memory and timeout are both sized from measured cold-start behaviour — see
> [Function configuration](../../README.md#function-configuration) in the root README
> for the numbers.

## 5. Point the site at the function

Set `NEXT_PUBLIC_CONTACT_VERIFY_URL` to the `FunctionUrl` printed in step 3:

- Local development — add to `.env.local` (gitignored):

  ```
  NEXT_PUBLIC_CONTACT_VERIFY_URL=<your-function-url>
  ```

- GitHub Actions — add a repository variable named `CONTACT_VERIFY_URL`. It is passed
  to `yarn build` in `.github/workflows/main.yml`.

> If you delete and recreate the function URL, the hostname changes. Update `.env.local`
> and the repository variable to match.

## 6. Cap the function's concurrency

The Function URL is public, so the function can be invoked directly. Requests that go
straight to the URL never pass through the site's CloudFront distribution, which means a
WAF rate-based rule on that distribution does not see them. Reserved concurrency is
therefore the backstop that bounds how hard the function can be driven:

```bash
aws lambda put-function-concurrency \
  --function-name recaptcha-verify \
  --reserved-concurrent-executions 5 \
  --region ap-southeast-1
```

5 concurrent submissions is comfortably above any legitimate burst; anything beyond that
is throttled with a `429`, which the form surfaces as its generic error. This also stops a
flood from draining the account's shared concurrency pool and affecting other functions.
Do not set it to `0` — that disables the function entirely.

> **This command currently fails on this account.** The *Concurrent executions* quota is
> **applied at 10** while the AWS **default is 1000** — the account is still on the
> new-account concurrency ramp, so the applied value sits *below* the default rather than
> above it. Service Quotas only accepts requests for values **greater than the default**,
> so a self-service increase cannot lift the applied 10; the API rejects it with
> *"You must provide a quota value greater than the default quota value of 1000.0"*.
> Raising it needs an AWS Support case, or the automatic ramp as the account ages.
>
> While this remains the account's only function, the applied value of 10 already acts as
> a hard ceiling: the function cannot exceed 10 concurrent invocations, so a flood is
> naturally bounded. What reserved concurrency adds is the ability to cap *below* that,
> and to keep a flood from consuming the whole account pool — worth doing once more
> functions exist.
>
> **If the account limit is ever raised, setting reserved concurrency becomes more urgent,
> not less.** The function could then scale to the full account pool (1000 by default),
> which is a far larger abuse ceiling than today's 10.

Check the current value with:

```bash
aws lambda get-function-concurrency --function-name recaptcha-verify --region ap-southeast-1
```

## Notes

- The secret key is only ever read by this function. It must never be committed
  or placed in any `NEXT_PUBLIC_*` variable.
- Nothing is published to SNS unless Google confirms the reCAPTCHA token, so the public
  Function URL can't be used to email you without first solving a challenge.
- The verified token's `hostname` must be `ongyiktatt.com`. The site key is public, so
  without this check any token minted with that key would be accepted. `www.ongyiktatt.com`
  is deliberately not allowed because it has no DNS record — adding a `www` hostname later
  also requires updating `ALLOWED_HOSTNAMES` in `index.mjs`.
- `name` and `email` are stripped of control characters before they reach the SNS
  `Subject`, so a crafted name cannot inject email headers. `message` keeps its newlines
  (it is the plain-text body) but CRLF is normalised to LF.
- SNS email notifications have no `Reply-To` header. The sender's address is included in
  the message body — switch to Amazon SES if you want to reply directly from your inbox.
- Test delivery independently of the website with:

  ```bash
  aws sns publish \
    --topic-arn arn:aws:sns:ap-southeast-1:$ACCOUNT_ID:contact-form-notifications \
    --subject "Test" --message "Test message" \
    --region ap-southeast-1
  ```
- Rotate the secret key in the [reCAPTCHA admin console](https://www.google.com/recaptcha/admin)
  if it has ever been shared or committed, then update the Lambda's
  `RECAPTCHA_SECRET_KEY` environment variable.
- To update the code later: `rm -f /tmp/function.zip && zip -q /tmp/function.zip index.mjs` then
  `aws lambda update-function-code --function-name recaptcha-verify --zip-file fileb:///tmp/function.zip --region ap-southeast-1`
  followed by `aws lambda wait function-updated --function-name recaptcha-verify --region ap-southeast-1`.
  Build the zip in `/tmp`, not in this directory — a stray `function.zip` dirties the working tree.
- **CORS is configured in exactly one place: the Function URL's `--cors` setting.**
  The handler must not set `Access-Control-Allow-Origin`. If it does, Lambda emits the
  header twice and browsers reject the response with
  *"the 'Access-Control-Allow-Origin' header contains multiple values"*, which surfaces
  as a failed form submission. The Function URL also answers `OPTIONS` preflights on its
  own, without invoking the function.
- The IP address of the caller is forwarded to Google as `remoteip`.
