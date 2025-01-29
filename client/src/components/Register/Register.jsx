/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './register.css'

import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Link,
  TextField,
  Typography,
  Card,
  Stack,
} from '@mui/material';

// CONTEXT IMPORTS
import { ptdContext, userDataContext } from '../zContextHooks/contextHooks';

// HELPER IMPORTS
import { changePage } from '../zzHelpers/helpers';
import { validatePasswordCriteria } from '../zzHelpers/helpers';
import { register } from '../zzzFetches/fetches'

const Register = () => {
  //* USESTATE
  const [pageToDisplay ,setPageToDisplay] = useContext(ptdContext); // Using only `setPageToDisplay`
  const [userData, setUserData] = useContext(userDataContext);

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('1900-01-01');
  const [userType, setUserType] = useState('parent');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');


  //* FUNCTIONS
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors
    if (!validateInputs()) {
      return; // stop submission if validation fails
    }
      try{
      const response =
        await register(
          username, 
          firstName, 
          lastName, 
          email, 
          password, 
          dob, 
          userType
        ); // register the user
        setUserData(response);
      alert('Registration Successful!');
      }
    catch (error) {
      console.error('Registration failed:', error);
    }
  }
  
    // Checks that inputs are valid
    const validateInputs = () => {
      console.log(password, confirmPassword); // Log the passwords
      if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
        console.log('All fields are required.'); // Log the error
        setError('All fields are required.');
        return false;
      }
      try {
        validatePasswordCriteria(password);
      } catch (error) { 
        setError(error.message);
        return false;
      } // Validate the password
      setError('');
  
      return true;
    };

    //* USEEFFECTS
    useEffect(() => {
      if (userData) {
        setTimeout(() => {
        setPageToDisplay(userData.userType);
        }, 1000);
      }
    }, [userData, setPageToDisplay]);

  //* RENDER
    return (
      <Stack sx={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
        <CssBaseline />
        <Card sx={{ padding: 4, width: '100%', maxWidth: 400, boxShadow: 3 }}>
          <Typography component="h1" variant="h5" textAlign="center" gutterBottom>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              fullWidth
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
            />
            <TextField
              required
              fullWidth
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              label="First Name"
            />
            <TextField
              required
              fullWidth
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              label="Last Name"
            />
            <TextField
              required
              fullWidth
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
            <TextField
              required
              fullWidth
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />

          <div>
            {confirmPassword && password
              ? confirmPassword !== password
                ? 'Passwords do not match'
                : ''
              : ''}
          </div>

            <TextField
              required
              fullWidth
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
            />
  
            {error && <Typography color="error" textAlign="center">{error}</Typography>}
  
            <Button type="submit" fullWidth variant="contained">
              Sign Up
            </Button>
            <Button
            variant="text"
            onClick={() => changePage(setPageToDisplay, 'landing')}
          >
            Back
          </Button>
          </Box>
          <Divider sx={{ my: 2 }}>or</Divider>
          <Typography textAlign="center">
            Already registered?{' '}
            <Link
              component="button"
              onClick={() => setPageToDisplay('login')} // Navigate to login page
              underline="none"
            >
              Login
            </Link>
          </Typography>
        </Card>
      </Stack>
    );
  };

  

export default Register;