import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || 'http://localhost:3000';

if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
  console.error(
    '[api.js] VITE_API_URL não definida em produção! ' +
    'Defina o secret VITE_API_URL no GitHub e FRONTEND_URL no Railway.'
  );
}

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mygarage_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;