// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import loginStyles from '../styles/LoginStyles';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../Components/LoginForm';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const { login, isLoading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <Container component="main" maxWidth="xs" sx={loginStyles.container}>
      <Box sx={loginStyles.box}>
        <LoginForm
          credentials={credentials}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error?.message}
        />
        <Typography 
          variant="body2" 
          color="textSecondary" 
          align="center" 
          sx={{ mt: 2, mb: 2 }}
        >
          Giriş bilgileri: admin / password123
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;