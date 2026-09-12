export const isBrowser = typeof window !== 'undefined';

/**
 * Returns the environment value when it's set and non-empty, otherwise the fallback.
 * A plain `??` isn't enough here: GitHub Actions substitutes an empty string for an
 * unset repository variable, and `'' ?? fallback` evaluates to `''`.
 */
const envOrDefault = (value: string | undefined, fallback: string): string =>
  value !== undefined && value.trim().length > 0 ? value : fallback;

/**
 * reCAPTCHA v2 site key. This is a public value and is safe to ship in the client bundle.
 * Override with the NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable if needed.
 */
export const recaptchaSiteKey: string = envOrDefault(
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  '6Ld7crUtAAAAADqptDfV8SH6wrdAqCHDLKV_N2G2',
);

/**
 * URL of the AWS Lambda Function URL that handles the contact form: it verifies the
 * reCAPTCHA token server-side and emails the submission via SNS. The secret key and
 * AWS credentials are only ever read by that function, never by the browser.
 *
 * This deliberately has **no fallback**. A live endpoint does not belong in a public
 * repository, and a missing value should stop the build rather than ship a form that
 * posts nowhere. Set it in `.env.local` for local development (see `.env.example`) and
 * as the `CONTACT_VERIFY_URL` repository variable for CI.
 */
export const contactVerifyUrl: string = envOrDefault(process.env.NEXT_PUBLIC_CONTACT_VERIFY_URL, '');

if (contactVerifyUrl.length === 0) {
  throw new Error(
    'NEXT_PUBLIC_CONTACT_VERIFY_URL is not set. Add it to .env.local, or set the CONTACT_VERIFY_URL repository variable for CI.',
  );
}

export const isMobile = isBrowser ? window.matchMedia('(pointer: coarse)').matches : false;
export const canUseDOM: boolean =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';
export const isApple: boolean = canUseDOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
