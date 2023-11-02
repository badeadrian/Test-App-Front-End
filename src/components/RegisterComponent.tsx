import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/apiService';
import { Button, TextField, Paper, Typography, Container, Box, Alert, Snackbar } from '@mui/material';


// The RegisterComponent for user registration
function RegisterComponent() {
   // State hooks for user input, errors, and feedback
  const [userInput, setUserInput] = useState({ name: '', email: '', password: '' });
  const [error] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

   // Handle user input change in the form fields
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInput(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle the user registration when form is submitted
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(userInput.name, userInput.email, userInput.password);

    if (success) {
        setOpenSnackbar(true);  
        setTimeout(() => {
            navigate('/login');
        }, 2000);
      }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '2em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Register</Typography>
        {error && <Alert severity="error" style={{ marginTop: '1em', width: '100%' }}>{error}</Alert>}
        <form onSubmit={handleRegister}>
          <Box mt={3}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              name="name"
              value={userInput.name}
              onChange={handleInputChange}
              autoComplete="name"
              autoFocus
            />
          </Box>
          <Box mt={2}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              value={userInput.email}
              onChange={handleInputChange}
              autoComplete="email"
            />
          </Box>
          <Box mt={2}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={userInput.password}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '1em 0' }}
          >
            Register
          </Button>
        </form>
      </Paper>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={() => setOpenSnackbar(false)}
        message="Registered successfully!"
        action={
            <Button color="secondary" size="small" onClick={() => setOpenSnackbar(false)}>
                Close
            </Button>
        }
      />
    </Container>
  );
}

export default RegisterComponent;
