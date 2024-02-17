// TODO: get API_KEY from env

const RIDEYEGO_API_URL = 'https://lambda.rideyego.com/technical-test';
const RIDEYEGO_API_KEY = 'qxECK0jBFkLEk4glKDHx3Z88mC11mUfxq7NMR2EY';

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
