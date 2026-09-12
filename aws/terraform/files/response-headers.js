/**
 * CloudFront Function (viewer-response) that adds the two security headers the managed
 * SecurityHeadersPolicy cannot set.
 *
 * Why a function rather than a response-headers policy: this distribution is on
 * CloudFront's Free pricing plan, which rejects custom response-headers policies outright
 * ("Distributions with the Free pricing plan can't have the following features: Custom
 * response headers policy"). The managed policy covers HSTS, X-Content-Type-Options,
 * X-Frame-Options, Referrer-Policy and X-XSS-Protection; these two are added here and
 * nowhere else, so they can never be emitted twice.
 *
 * A policy is not even possible for the second one: CloudFront's SecurityHeadersConfig has
 * no Permissions-Policy field at all.
 *
 * __CONNECT_SRC__ is replaced with the Lambda Function URL by Terraform, so the browser is
 * allowed to reach the contact form.
 */
function handler(event) {
  var response = event.response;
  var headers = response.headers;

  // Strict, because the static export contains no inline executable scripts. style-src
  // still needs 'unsafe-inline': the export carries one inline style attribute and
  // reCAPTCHA injects its own styles.
  headers['content-security-policy'] = {
    value:
      "default-src 'self'; " +
      "base-uri 'self'; " +
      "object-src 'none'; " +
      "frame-ancestors 'none'; " +
      "form-action 'self'; " +
      "script-src 'self' https://www.google.com https://www.gstatic.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https://www.gstatic.com; " +
      "font-src 'self' data:; " +
      "frame-src https://www.google.com; " +
      "connect-src 'self' __CONNECT_SRC__; " +
      "upgrade-insecure-requests",
  };

  // Nothing on the site asks for any of these, so deny them all.
  headers['permissions-policy'] = {
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  };

  return response;
}
