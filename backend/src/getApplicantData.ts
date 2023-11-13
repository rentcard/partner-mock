import axios from 'axios';

export async function getApplicantData (storedToken: string): Promise<any> {
  try {
    const response = await axios.get('https://api.development.rentcard.app/api/v1/partners/scores/individual', {
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