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

// lazy initializing the Shared configuration
const getSharedConfig = (): OAuthConfig => ({
  client: {
    id: process.env.CLIENT_ID as string,
    secret: process.env.CLIENT_SECRET as string,
  },
  auth: {
    tokenHost: 'https://auth.development.rentcard.app',
    tokenPath: '/api/v1/oauth2',
  },
});

// Shared configuration for OAuth clients
let sharedConfig: OAuthConfig | null = null;

export async function getAccessToken(): Promise<Token> {
  if (!sharedConfig) {
    sharedConfig = getSharedConfig();
  }

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
    handleError(error, 'Failed to retrieve access token 1');
  }
}

export async function exchangeAuthCode(code: string, finalRedirectUrl: string): Promise<AccessToken> {
  if (!sharedConfig) {
    sharedConfig = getSharedConfig();
  }
  
  const client = new AuthorizationCode(sharedConfig);
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