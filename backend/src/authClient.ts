// authClient.ts
import { AccessToken, AuthorizationCode, ClientCredentials, Token } from 'simple-oauth2';

interface AccessTokenResponse {
  accessToken: Token;
}

interface OAuthConfig {
  client: {
    id: string;
    secret: string;
  };
  auth: {
    tokenHost: string;
    tokenPath: string;
  };
}

// Shared configuration for OAuth clients
const sharedConfig: OAuthConfig = {
  client: {
    id: process.env.CLIENT_ID as string,
    secret: process.env.CLIENT_SECRET as string,
  },
  auth: {
    tokenHost: 'https://auth.development.rentcard.app',
    tokenPath: '/api/v1/oauth2',
  },
};

export async function getAccessToken(): Promise<Token> {
  const config = {
    ...sharedConfig,
    options: {
      authorizationMethod: "body" as "body",
    },
  };
  const client = new ClientCredentials(config);

  try {
    const accessToken = await client.getToken({});
    return accessToken.token;
  } catch (error: unknown) {
    handleError(error, 'Failed to retrieve access token');
  }
}

export async function exchangeAuthCode(code: string, finalRedirectUrl: string): Promise<AccessToken> {
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
    redirect_uri: finalRedirectUrl,
  };
  try {
    const accessToken = await client.getToken(tokenParams);
    return accessToken;
  } catch (error) {
    handleError(error, 'Failed to exchange access token');
  }
}

function handleError(error: unknown, defaultMessage: string): never {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  }
  throw new Error(defaultMessage);
}