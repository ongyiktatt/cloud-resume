export const isBrowser = typeof window !== 'undefined';

/**
 * Reads a required public environment variable.
 *
 * `NEXT_PUBLIC_*` values are inlined into the bundle at build time, so they are public by
 * design — never put a secret in one. A missing or empty value stops the build rather than
 * shipping an empty configuration, which matters because GitHub Actions substitutes an
 * empty string for an unset repository variable.
 */
const requiredEnv = (name: string, value: string | undefined, hint: string): string => {
  const resolved = value !== undefined ? value.trim() : '';

  if (resolved.length === 0) {
    throw new Error(`${name} is not set. ${hint}`);
  }

  return resolved;
};

/**
 * reCAPTCHA v2 **site** key — the public half of the pair, passed to the contact form's
 * widget. The matching secret key is read only by the Lambda, never here or in the browser.
 */
export const recaptchaSiteKey: string = requiredEnv(
  'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  'Add it to .env.local, or set the RECAPTCHA_SITE_KEY repository variable for CI.',
);

/**
 * URL of the AWS Lambda Function URL that handles the contact form: it verifies the
 * reCAPTCHA token server-side and emails the submission via SNS. The secret key and
 * AWS credentials are only ever read by that function, never by the browser.
 *
 * There is deliberately no fallback: a live endpoint does not belong in a public
 * repository.
 */
export const contactVerifyUrl: string = requiredEnv(
  'NEXT_PUBLIC_CONTACT_VERIFY_URL',
  process.env.NEXT_PUBLIC_CONTACT_VERIFY_URL,
  'Add it to .env.local, or set the CONTACT_VERIFY_URL repository variable for CI.',
);

export const isMobile = isBrowser ? window.matchMedia('(pointer: coarse)').matches : false;
export const canUseDOM: boolean =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';
export const isApple: boolean = canUseDOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
