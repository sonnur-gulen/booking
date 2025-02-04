import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = "/api/";


export const createToken = async () => {
  try {
    const response = await axios.post(
      `${API_URL}auth`,
      {
        username: 'admin',
        password: 'password123'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.token;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('auth', credentials);
    return response.data;
  } catch (error) {
    toast.error('Login failed!');
    throw error;
  }
};

export const fetchReservations = async () => {
  try {
    const response = await api.get('booking');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchReservationById = async (id) => {
  try {
    const token = await createToken();
    return await api.get(`booking/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      }
    });
  } catch (error) {
    throw new Error(`Failed to fetch reservation: ${error.message}`);
  }
};

export const fetchReservationByDate = async (date) => {
  try {
    const token = await createToken();
    return await api.get(`booking?checkin=${date}`, {
      headers: {
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      }
    });
  } catch (error) {
    throw new Error(`Failed to fetch reservation: ${error.message}`);
  }
};


export const updateReservation = (id, data) => api.put(`booking/${id}`, data);
export const deleteReservation = (id) => api.delete(`booking/${id}`);
export const createReservation = (data) => api.post("booking", data);


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