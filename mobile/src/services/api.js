import axios from 'axios';
import Constants from 'expo-constants';
import { getAuthToken } from './authToken';

// Expo: tenta descobrir o IP do computador automaticamente
const host =
  Constants.expoConfig?.hostUri?.split(':')?.[0] ||
  Constants.manifest2?.extra?.expoClient?.hostUri?.split(':')?.[0] ||
  'localhost';

const api = axios.create({
  baseURL: `http://${host}:3000`,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

