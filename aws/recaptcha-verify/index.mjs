/**
 * AWS Lambda handler (invoked through a Function URL) that verifies a reCAPTCHA v2
 * token with Google's siteverify API and, when the token is valid, publishes the
 * contact form submission to an SNS topic (which emails the site owner).
 *
 * Runtime: Node.js 20 (uses the built-in global `fetch`, plus the AWS SDK v3 that
 * ships with the runtime).
 *
 * Required environment variables:
 *   RECAPTCHA_SECRET_KEY - reCAPTCHA v2 secret key. Never expose this to the browser.
 *   SNS_TOPIC_ARN        - SNS topic that contact form notifications are published to.
 *
 * CORS is deliberately NOT handled here. It is configured once on the Function URL
 * (the `--cors` option of create-function-url-config). If the handler also sets
 * `Access-Control-Allow-Origin`, Lambda emits the header twice and browsers reject the
 * response with "contains multiple values".
 */

import {PublishCommand, SNSClient} from '@aws-sdk/client-sns';

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

// Field limits: generous enough for real messages, but bounded so a public endpoint
// can't be used to publish arbitrary amounts of data.
const MAX_LENGTHS = {email: 320, message: 5000, name: 200};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sns = new SNSClient({});

const respond = (statusCode, body) => ({
  body: JSON.stringify(body),
  headers: {'Content-Type': 'application/json'},
  statusCode,
});

/**
 * Validates and normalises the submitted form fields.
 * Returns null when anything is missing, the wrong type, too long, or not an email.
 */
const parseSubmission = payload => {
  const {name, email, message} = payload;

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return null;
  }

  const submission = {email: email.trim(), message: message.trim(), name: name.trim()};

  if (!submission.name || !submission.email || !submission.message) {
    return null;
  }

  if (
    submission.name.length > MAX_LENGTHS.name ||
    submission.email.length > MAX_LENGTHS.email ||
    submission.message.length > MAX_LENGTHS.message ||
    !EMAIL_PATTERN.test(submission.email)
  ) {
    return null;
  }

  return submission;
};

const formatMessage = ({name, email, message}) =>
  [
    'New message from the contact form.',
    '',
    `Name:    ${name}`,
    `Email:   ${email}`,
    '',
    'Message:',
    '--------',
    message,
  ].join('\n');

export const handler = async event => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    console.error('RECAPTCHA_SECRET_KEY is not set on the Lambda function.');
    return respond(500, {error: 'Server misconfigured', success: false});
  }

  let payload;
  try {
    const rawBody = event.isBase64Encoded ? Buffer.from(event.body ?? '', 'base64').toString('utf8') : event.body;
    payload = JSON.parse(rawBody ?? '{}');
  } catch {
    return respond(400, {error: 'Invalid JSON body', success: false});
  }

  const token = payload.token;

  if (typeof token !== 'string' || token.length === 0) {
    return respond(400, {error: 'Missing reCAPTCHA token', success: false});
  }

  const params = new URLSearchParams({response: token, secret});
  const remoteIp = event.requestContext?.http?.sourceIp;

  if (remoteIp) {
    params.set('remoteip', remoteIp);
  }

  try {
    const googleResponse = await fetch(VERIFY_URL, {body: params, method: 'POST'});
    const result = await googleResponse.json();

    if (!result.success) {
      console.warn('reCAPTCHA verification failed:', result['error-codes']);
      return respond(400, {errorCodes: result['error-codes'] ?? [], success: false});
    }

    const submission = parseSubmission(payload);

    if (!submission) {
      return respond(400, {error: 'Missing or invalid form fields', success: false});
    }

    const topicArn = process.env.SNS_TOPIC_ARN;

    if (!topicArn) {
      console.error('SNS_TOPIC_ARN is not set on the Lambda function.');
      return respond(500, {error: 'Server misconfigured', success: false});
    }

    // The token is valid, so forward the submission to SNS for delivery by email.
    try {
      await sns.send(
        new PublishCommand({
          Message: formatMessage(submission),
          // SNS truncates subjects longer than 100 characters.
          Subject: `Contact form: ${submission.name}`.slice(0, 100),
          TopicArn: topicArn,
        }),
      );
    } catch (error) {
      console.error('Failed to publish the submission to SNS:', error);
      return respond(502, {error: 'Failed to send message', success: false});
    }

    return respond(200, {success: true});
  } catch (error) {
    console.error('Failed to reach reCAPTCHA siteverify:', error);
    return respond(502, {error: 'Verification service unavailable', success: false});
  }
};
