import React, { useState } from 'react';
import { login } from '../services/apiService';
import { Button, TextField, Paper, Container } from '@mui/material';

// Props definition for LoginComponent
interface LoginProps {
    onLoginSuccess?: () => void;
}

const LoginComponent: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    // State hooks for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   // Handles the login submission
  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      const token = await login(email, password);
      if (token) {
          onLoginSuccess?.();
      } else {
          console.error('Failed to login with provided credentials.');
      }
  };

  return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <Container component="main" maxWidth="xs">
              <Paper elevation={3} style={{ padding: '2em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <form onSubmit={handleLogin}>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          autoFocus
                      />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          label="Password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                      />
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          style={{ margin: '1em 0' }}
                      >
                          Login
                      </Button>
                  </form>
              </Paper>
          </Container>
      </div>
  );
};

export default LoginComponent;
