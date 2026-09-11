export const isBrowser = typeof window !== 'undefined';

/**
 * reCAPTCHA v2 site key. This is a public value and is safe to ship in the client bundle.
 * Override with the NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable if needed.
 */
export const recaptchaSiteKey: string =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '6Ld7crUtAAAAADqptDfV8SH6wrdAqCHDLKV_N2G2';

/**
 * URL of the AWS Lambda Function URL that verifies reCAPTCHA tokens server-side.
 * The secret key is only ever read by that function, never by the browser.
 * Override with the NEXT_PUBLIC_CONTACT_VERIFY_URL environment variable.
 */
export const contactVerifyUrl: string = process.env.NEXT_PUBLIC_CONTACT_VERIFY_URL ?? '';

export const isMobile = isBrowser ? window.matchMedia('(pointer: coarse)').matches : false;
export const canUseDOM: boolean =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';
export const isApple: boolean = canUseDOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
