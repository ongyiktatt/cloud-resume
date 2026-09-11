/**
 * AWS Lambda handler (invoked through a Function URL) that verifies a reCAPTCHA v2
 * token with Google's siteverify API.
 *
 * Runtime: Node.js 18 or later (uses the built-in global `fetch`).
 *
 * Required environment variable:
 *   RECAPTCHA_SECRET_KEY - reCAPTCHA v2 secret key. Never expose this to the browser.
 *
 * Optional environment variable:
 *   ALLOWED_ORIGIN - comma-separated list of origins allowed to call this function.
 *                    Defaults to https://ongyiktatt.com
 */

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

const allowedOrigins = (process.env.ALLOWED_ORIGIN ?? 'https://ongyiktatt.com')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const resolveOrigin = requestOrigin => {
  if (allowedOrigins.includes('*')) {
    return '*';
  }

  return allowedOrigins.includes(requestOrigin) ? requestOrigin : allowedOrigins[0];
};

const corsHeaders = origin => ({
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Origin': origin,
  Vary: 'Origin',
});

export const handler = async event => {
  const requestOrigin = event.headers?.origin ?? event.headers?.Origin ?? '';
  const headers = corsHeaders(resolveOrigin(requestOrigin));

  const respond = (statusCode, body) => ({
    body: JSON.stringify(body),
    headers: {...headers, 'Content-Type': 'application/json'},
    statusCode,
  });

  // CORS preflight.
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return {body: '', headers, statusCode: 204};
  }

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

    // The token is valid. Add your email/forwarding logic here (e.g. Amazon SES)
    // using payload.name, payload.email and payload.message.
    return respond(200, {success: true});
  } catch (error) {
    console.error('Failed to reach reCAPTCHA siteverify:', error);
    return respond(502, {error: 'Verification service unavailable', success: false});
  }
};
