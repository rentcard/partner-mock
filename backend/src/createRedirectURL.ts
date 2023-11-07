/**
 * Constructs the OAuth redirect URL.
 * @param preUserOneTimeToken - A one-time token for the pre-user.
 * @returns {string} The OAuth redirect URL.
 */

export async function createRedirectURL(preUserOneTimeToken: string, user: string) {
  const redirectUrl = encodeURIComponent(`http://localhost:4200/registration?PreUserOneTimeToken=${preUserOneTimeToken}&user=${user}`);
  const finalRedirectUrl = encodeURIComponent(`http://localhost:4200/registration?user=${user}`);
  const state = encodeURIComponent(JSON.stringify({
    successRedirectUrl: "customer-subdomain.somepartner.co/candidates/public/success-page",
    redirectUrl: "http://localhost:3001/app/auth/rentcard/callback", finalRedirectUrl: finalRedirectUrl
  }));


  const oauthUrl = `https://auth.development.rentcard.app/api/v1/oauth2` +
    `?grant_type=exchange` +
    `&redirectUrl=${redirectUrl}` +
    `&state=${state}`;

  return oauthUrl;
}
