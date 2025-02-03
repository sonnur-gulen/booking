import axios from 'axios';

const BASE_URL = 'https://restful-booker.herokuapp.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
   //   toast.success('Login successful!');
    }
    return response.data;
  } catch (error) {
    toast.error('Login failed!');
    throw error;
  }
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
  };