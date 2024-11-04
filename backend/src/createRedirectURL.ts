/**
 * Constructs the OAuth redirect URL.
 * @param preUserOneTimeToken - A one-time token for the pre-user.
 * @returns {string} The OAuth redirect URL.
 */

export async function createRedirectURL(
  preUserOneTimeToken: string,
  user: string
) {
  const apiBaseUrl = process.env.API_BASE_URL;
  const redirect_uri = encodeURIComponent(
    `${apiBaseUrl}/app/auth/rentcard/callback`
  );
  const state = JSON.stringify({
    successRedirectUrl: `http://localhost:4000/`,
    applicantId: "1234567",
    redirectData: {
      preUserOneTimeToken: preUserOneTimeToken,
      user: '{"objectId":"2250345","applicantId":"1234567","rent":"1000","deposit":"3000","currency":"EUR","callbackURL":"www.rentcard.com","partnerId":"71898238096"}',
    },
  });

  const oauthUrl =
    `${process.env.AUTH_URL}/api/v1/oauth2` +
    `?response_type=code` +
    `&redirect_uri=${redirect_uri}` +
    `&client_id=${process.env.CLIENT_ID}` +
    `&state=${state}`;

  return oauthUrl;
}
