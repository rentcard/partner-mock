/**
 * Constructs the OAuth redirect URL.
 * @param preUserOneTimeToken - A one-time token for the pre-user.
 * @returns {string} The OAuth redirect URL.
 */

export async function createRedirectURL(preUserOneTimeToken: string, user: string) {
  // Construct the state parameter as a JSON string
  const state = encodeURIComponent(JSON.stringify({
    "success_redirect_url": "customer-subdomain.somepartner.co/candidates/public/success-page",
    "redirect-url": "app.somepartner.co/app/auth/rentcard/callback"
  }));

  // Construct the redirectUrl parameter
  const redirectUrl = encodeURIComponent('development.my.othercompany.app/registration');


  // Construct the entire OAuth URL
  const oauthUrl = `https://auth.development.rentcard.app/oauth2` +
    `?requestType=exchange` +
    `&redirectUrl=${redirectUrl}?PreUserOneTimeToken=${preUserOneTimeToken}&user=${user}` +
    `&state=${state}`;

  return oauthUrl;
}
