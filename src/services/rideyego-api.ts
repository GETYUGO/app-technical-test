import { RIDEYEGO_API_URL, RIDEYEGO_API_KEY } from '@env';

export const getVehiclesList = async () => {
  try {
    const response = await fetch(RIDEYEGO_API_URL, {
      headers: { 'x-api-key': RIDEYEGO_API_KEY },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
