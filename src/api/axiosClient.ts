import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Kimlik bilgilerini gönder
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
