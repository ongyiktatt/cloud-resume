function handler(event) {
  const response = event.response;

  // Only the two headers the managed SecurityHeadersPolicy does not set. Adding just
  // these makes it impossible to duplicate a header CloudFront already emits.
  response.headers['content-security-policy'] = {
    value: "default-src 'self'; script-src 'self' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://www.google.com https://www.gstatic.com https://6z2mcyqkmz6sqzmxzbcol7ejum0bjuoh.lambda-url.ap-southeast-1.on.aws; frame-src https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
  };

  response.headers['permissions-policy'] = {
    value: 'accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), xr-spatial-tracking=()',
  };

  return response;
}
