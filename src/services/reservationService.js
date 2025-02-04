import api from './api';
import { getToken } from './authService';

export const STORAGE_KEY = 'reservationData';
export const CACHE_DURATION = 1000 * 60 * 60;
export const BATCH_SIZE = 50;
export const MAX_RECORDS = 500;
export const BATCH_DELAY = 500;

const getHeaders = async () => {
  const token = await getToken();
  return {
    'X-Access-Token': token,
    'Authorization': `Basic ${btoa('admin:password123')}`
  };
};

export const fetchBookings = async () => {
  const headers = await getHeaders();
  const response = await api.get('/booking', { headers });
  return response.data;
};

export const fetchBookingDetails = async (id) => {
  const headers = await getHeaders();
  try {
    const response = await api.get(`/booking/${id}`, { headers });
    return { ...response.data, id };
  } catch (error) {
    return null;
  }
};

