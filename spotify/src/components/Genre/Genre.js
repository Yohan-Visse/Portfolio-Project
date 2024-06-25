import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const getGenre = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genres`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};