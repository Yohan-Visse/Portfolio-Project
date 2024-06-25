import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const getAlbum = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/albums`);
        return response.data;
    } catch(error) {
        console.error(error);
    }
};