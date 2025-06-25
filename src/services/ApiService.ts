import axios, { AxiosError } from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url;

    console.error(`Erro [${status}] na requisição para ${url}:`, error.response?.data || error.message);

    return Promise.reject(error);
  }
);

api.interceptors.request.use(config => {
  return config;
});

export default api;
