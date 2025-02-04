import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as authService from '../services/authService';

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  const login = async (credentials) => {
    setLoading(true);
    try {
      const success = await authService.login(credentials);
      if (success) {
        setIsAuthenticated(true);
        toast.success('Giriş başarılı!');
        navigate('/dashboard');
        return true;
      }
      toast.error('Giriş başarısız!');
      return false;
    } catch (error) {
      toast.error('Giriş sırasında bir hata oluştu');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    navigate('/login');
    toast.info('Çıkış yapıldı');
  };

  return { isAuthenticated, loading, login, logout };
};