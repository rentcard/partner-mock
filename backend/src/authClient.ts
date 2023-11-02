// authClient.ts
import { ClientCredentials, Token } from 'simple-oauth2';

interface AccessTokenResponse {
  accessToken: Token;
}

export async function getAccessToken() {
  const config = {
    client: {
      id: process.env.CLIENT_ID as string,
      secret: process.env.CLIENT_SECRET as string
    },
    auth: {
      tokenHost: 'https://auth.development.rentcard.app',
      tokenPath: '/api/v1/oauth2/token'
    }
  };

  const client = new ClientCredentials(config);

  try {
    const tokenParams = {
      requestType: 'access-token',
    };

    const accessToken = await client.getToken({ tokenParams });
    console.log('The resulting token: ', accessToken.token);
    return accessToken.token;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Access Token error:', error.message);
    } else {
      throw new Error('Failed to retrieve access token');
    }
  }
}
