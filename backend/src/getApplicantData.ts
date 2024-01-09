import axios from 'axios';

export async function getApplicantData (storedToken: string): Promise<any> {
  try {
    const response = await axios.get(`${process.env.API_URL}/api/v1/partners/scores/individual`, {
      headers: {
        'Authorization': `Bearer ${storedToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching scores:', error.message);
    }
  }
};