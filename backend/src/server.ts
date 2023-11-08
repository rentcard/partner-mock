import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { exchangeAuthCode, getAccessToken } from './authClient';
import { createPreUser } from './createPreUser';
import { createRedirectURL } from './createRedirectURL';
import { getApplicantData } from './getApplicantData';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

interface storedData {[key: string]:string;}; 
const storedData: storedData = {}; // This is just for demo purposes, would obviously be a database in production

const applId = "1234567"; // This is the same applicantId as passed in the frontend

app.get('/app/auth/rentcard', async (req: Request, res: Response) => {
  // get the user object from the request
  const user = String(req.query.user);
  if (!user || typeof user !== 'string' || user === "") {
    return res.status(400).send('User is missing or not in the correct format');
  }
  
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
    } 
  }
});

app.get('/app/auth/rentcard/callback', async (req: Request, res: Response) => {
  const code = req.query.code;
  const finalRedirectUrl = req.query.finalRedirectUrl as string || "";

  if (code && typeof code === 'string' && finalRedirectUrl && finalRedirectUrl !== "") {  
    const accessToken = await exchangeAuthCode(code as string, finalRedirectUrl as string);
    storedData["storedToken"] = accessToken?.token.access_token as string;
    console.log(storedData["storedToken"]);
    res.redirect(finalRedirectUrl);
  }    
  else {
    throw new Error('Failed to retrieve access token');
  }
});

app.post('/app/auth/rentcard/webhook', async (req: Request, res: Response) => {
  const applicantId = req.body.applicantId as string || "";
  const operation = req.body.operation as string || "";
  if(applId === applicantId && operation === "UPDATE"){
    const applicantData = getApplicantData(storedData["storedToken"]);
    console.log(applicantData);
    res.status(200).send(applicantData);
  }
  else{
    res.status(200).send("No applicant data found");
  }
}); 

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});