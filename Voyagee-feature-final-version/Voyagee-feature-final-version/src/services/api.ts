import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.128:3000',
  headers: {
    'Content-Type': 'application/json'
}
});
export const api2 = axios.create({
  baseURL: 'http://192.168.1.128:8080',
  headers: {
    'Content-Type': 'application/json'
}
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;