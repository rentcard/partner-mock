import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { exchangeAuthCode, getAccessToken } from './authClient';
import { createPreUser } from './createPreUser';
import { createRedirectURL } from './createRedirectURL';

dotenv.config();
const app = express();
app.use(cors());

const port = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is up and running!');
});

app.get('/app/auth/rentcard', async (req: Request, res: Response) => {
  // get the user object from the request
  const queryuser = req.query.user;
  if (!queryuser) {
    return res.status(400).send('User is missing');
  }
  if (typeof queryuser !== 'string') {
    return res.status(400).send('User is not a string');
  }
  
  const user = String(queryuser);  

  if(user !== "") {
    try {
      // Step 1: Get the access token
      const accessToken = await getAccessToken();
      var preUserOneTimeToken = "";
      // Step 2: POST preUser using the accessToken
      if (accessToken && accessToken.access_token && typeof accessToken.access_token === 'string') {
        preUserOneTimeToken = await createPreUser(accessToken.access_token);
      }    
      else {
        throw new Error('Failed to retrieve access token');
      }
      // Step 3: Redirect user back to rentcard
      if (preUserOneTimeToken){
        const redirectUrl = await createRedirectURL(preUserOneTimeToken, user);
        console.log(redirectUrl);
        res.redirect(redirectUrl);
      }
      else {
        res.status(400).send('Some error occured, please go back to the previous page.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      } else {
        console.error('An unknown error occured');
      }
    }
  }
  else {
    res.status(400).send('User is missing or malformatted');
  }
});

app.get('/app/auth/rentcard/callback', async (req: Request, res: Response) => {
  // get the user object from the request
  const authorization_code = req.query.authorization_code;
  console.log("authorization_code:", authorization_code);
  const redirectUrl = req.query.redirect_url as string || "";

  if (authorization_code &&  typeof authorization_code === 'string') {  
    const accessToken = await exchangeAuthCode(authorization_code as string);
    // Do the call to the RC backend here
    // Then show something for a few seconds before redirecting
    console.log('The resulting token: ', accessToken);
    res.redirect(redirectUrl);

  }    
  else {
    throw new Error('Failed to retrieve access token');
  }
  
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});