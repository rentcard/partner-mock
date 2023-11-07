// authClient.ts
import { AuthorizationCode, ClientCredentials, Token } from 'simple-oauth2';

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
      tokenPath: '/api/v1/oauth2'
    },
    options: {
      authorizationMethod: "body" as "body"
    }
  };
  const client = new ClientCredentials(config);

  try {
    const accessToken = await client.getToken({ });
    return accessToken.token;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Access Token error:', error);
      }
    else {
      throw new Error('Failed to retrieve access token 1');
    }
  }
}

export async function exchangeAuthCode(code: string) {
  const config = {
    client: {
      id: process.env.CLIENT_ID as string,
      secret: process.env.CLIENT_SECRET as string
    },
    auth: {
      tokenHost: 'https://auth.development.rentcard.app',
      tokenPath: '/api/v1/oauth2'
    },
  };
  
  const client = new AuthorizationCode(config);
  const tokenParams = {
    code: code, 
    redirect_uri: 'http://localhost:4200/registration',
  };
  try {
    const accessToken = await client.getToken(tokenParams);
    return accessToken;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Access Token error:', error);
      }
    else {
      throw new Error('Failed to retrieve access token 2');
    }
  }
}