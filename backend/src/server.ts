import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { getAccessToken } from './authClient';
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
  var user = "";
  if (!queryuser) {
    res.status(400).send('User is missing');
  }
  else if (typeof queryuser !== 'string') {
    res.status(400).send('User is not a string');
  }
  else {
    user = queryuser as string;
  }

  if(user !== "") {
    try {
      // Step 1: Get the access token
      /* const accessToken = await getAccessToken();
      var preUserOneTimeToken = "";

      // Step 2: POST preUser using the accessToken
      if (accessToken && accessToken.access_token && typeof accessToken.access_token === 'string') {
        preUserOneTimeToken = await createPreUser(accessToken.access_token);
      }    
      else {
        throw new Error('Failed to retrieve access token');
      } */
      const preUserOneTimeToken = "1234567890";

      // Step 3: Redirect user back to rentcard
      if (preUserOneTimeToken){
        const redirectUrl = await createRedirectURL(preUserOneTimeToken, user);
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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});