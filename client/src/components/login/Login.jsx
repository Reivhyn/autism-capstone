/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Stack,
  Card,
} from '@mui/material';
import './login.css';

// CONTEXT IMPORTS
import { ptdContext, userDataContext } from '../zContextHooks/contextHooks';

// HELPER IMPORTS
import { changePage } from '../zzHelpers/helpers';

// FETCH IMPORTS
import { logIn } from '../zzzFetches/fetches';

const Login = () => {
  //* USESTATE
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext); // Page control
  const [userData, setUserData] = useContext(userDataContext); // User data context
  const [userName, setUserName] = useState(''); // Username input
  const [password, setPassword] = useState(''); // Password input
  const [error, setError] = useState(''); // Error message

  //* FUNCTIONS
  const loginUser = async () => {
    try {
      const data = await logIn(userName, password);
      setUserData(data);
      if (!data) {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error); // Logs the error in the console

    }
  };

  //* USEEFFECTS
  useEffect(() => {
    console.log('pageToDisplay', pageToDisplay)
    if (userData) {
      setTimeout(() => {
        //if kid take to landing
        if (userData.userType === 'kid') {
          setPageToDisplay('landing');
          return
        } 

        // if parent or admin take to portal
        setPageToDisplay(userData.userType)
      }, 500);
    }
  }, [userData, setPageToDisplay]);

  //* RENDER
  if (userData) {
    return (
      <Typography variant="h5" align="center">
        Welcome {userData.userName}!
      </Typography>
    );
  }

  return (
    <Stack sx={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
      <CssBaseline />
      <Card sx={{ padding: 4, width: '100%', maxWidth: 400, boxShadow: 3 }}>
        <Typography component="h1" variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            required
            fullWidth
            label="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            error={!!error}
            helperText={error && 'Invalid username or password.'}
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={() => loginUser()}
          >
            Login
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button
            variant="text"
            onClick={() => changePage(setPageToDisplay, 'register')}
          >
            Register
          </Button>
          <Button
            variant="text"
            onClick={() => changePage(setPageToDisplay, 'landing')}
          >
            Back
          </Button>
        </Box>
      </Card>
    </Stack>
  );
};

export default Login;