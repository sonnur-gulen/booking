import api from './api';

const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRY_KEY = 'auth_token_expiry';
const TOKEN_DURATION = 1000 * 60 * 60; 


let navigateFunction = null;

export const setNavigate = (navigate) => {
  navigateFunction = navigate;
};

export const login = async (credentials = {}) => {
  try {
    const response = await api.post('/auth', {
      username: credentials.username || 'admin',
      password: credentials.password || 'password123'
    });

    if (response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(TOKEN_EXPIRY_KEY, (Date.now() + TOKEN_DURATION).toString());
     
      if (navigateFunction) {
        navigateFunction('/dashboard');
      }
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login hatası:', error);
    return false;
  }
};

export const getToken = async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

  if (token && expiry && Date.now() < parseInt(expiry)) {
    return token;
  }

  const success = await login();
  return success ? localStorage.getItem(TOKEN_KEY) : null;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);

  if (navigateFunction) {
    navigateFunction('/login');
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  return token && expiry && Date.now() < parseInt(expiry);
};