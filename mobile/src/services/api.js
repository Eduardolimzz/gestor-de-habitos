import axios from 'axios';

// IMPORTANTE: troque o IP abaixo pelo IP atual do seu computador na rede Wi-Fi
// Para descobrir: no Windows abra o CMD e digite "ipconfig"
// Procure por "Endereço IPv4" na seção do Wi-Fi (ex: 192.168.x.x ou 172.x.x.x)
const BASE_URL = 'http://172.27.6.225:3000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK' || !error.response) {
      console.error('[API] Erro de conexão — verifique se o backend está rodando e se o IP está correto:', BASE_URL);
    } else {
      console.error('[API] Erro na resposta:', error.response?.status, error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default api;