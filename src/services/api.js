
import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'https://restful-booker.herokuapp.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth', credentials);
    return response.data;
  } catch (error) {
    toast.error('Login failed!');
    throw error;
  }
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;