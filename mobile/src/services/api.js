import axios from 'axios';
import Constants from 'expo-constants';
import { getAuthToken } from './authToken';

// Pega o IP do computador automaticamente via Expo — funciona em qualquer máquina
const host =
  Constants.expoConfig?.hostUri?.split(':')[0] ||
  Constants.manifest?.debuggerHost?.split(':')[0] ||
  'localhost';

const BASE_URL = `http://${host}:3000`;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('[API] Erro de conexão — backend está rodando?', BASE_URL);
    } else {
      console.error('[API] Erro na resposta:', error.response?.status, error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default api;
