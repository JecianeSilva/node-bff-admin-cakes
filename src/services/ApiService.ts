import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  res => res,
  err => {
    console.error('API Error:', err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;