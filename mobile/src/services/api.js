import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.27.6.225:3000'
});

export default api;