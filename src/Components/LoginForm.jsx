
import { Box, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import loginStyles from '../styles/LoginStyles';
import Logo from './Logo';

const LoginForm = ({ credentials, onChange, onSubmit, isLoading, error }) => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Logo width={80} height={40} />
      </Box>
      
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Login
      </Typography>

      <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Username"
          name="username"
          autoFocus
          value={credentials.username}
          onChange={onChange}
          disabled={isLoading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={credentials.password}
          onChange={onChange}
          disabled={isLoading}
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </>
  );
};

export default LoginForm;