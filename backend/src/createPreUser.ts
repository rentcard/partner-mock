import axios from 'axios';
import { AxiosResponse } from 'axios';

export async function createPreUser(accessToken: string): Promise<string> {
  
  const postData = {
    "personalData": {
      "firstName": "John",
      "lastName": "Doe",
      "phoneNumber": "+491234567890"
    },
    "employment": {
      "type": "Employee",
      "netIncome": 3200
    },
    "rental": {
      "adults": 2,
      "kids": 3
    },
    "email": "example@website.com"
  };

  const url = 'https://api.development.rentcard.app/api/v1/partners/preuser';

  try {
    const response = await axios.post(url, postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    else if(response && response.data.preUserOneTimeToken) {
      return response.data.preUserOneTimeToken as string;
    }
    else {
      throw new Error('Failed to retrieve preUserOneTimeToken');
    }
  } catch (error:any) {
    // You may want to handle errors differently or throw them to be handled by the caller
    throw new Error(error.response ? error.response.data : error.message);
  }
}