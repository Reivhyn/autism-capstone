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
  const [errors, setErrors] = useState({});


  //* FUNCTIONS
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(''); // Clear any previous errors
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

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  
    // Checks that inputs are valid
    const validateInputs = () => {
      let newErrors = {};
      console.log(password, confirmPassword); // Log the passwords
if (!firstName) newErrors.firstName = "First Name is required.";
    if (!lastName) newErrors.lastName = "Last Name is required.";
    if (!dob) newErrors.dateOfBirth = "Date of Birth is required.";
    if (!username) newErrors.userName = "Username is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }
  
    if (!password) {
      newErrors.password = "Password is required.";
    } else {
      try {
        validatePasswordCriteria(password);
      } catch (error) {
        newErrors.password = error.message;
      }
    }

    if(!confirmPassword) newErrors.confirmPassword = "Confirm Password is required.";
  
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
  
    setErrors(newErrors); // Update errors state
  
    return Object.keys(newErrors).length === 0; // Return true if no errors
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
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', padding: 2 }}>
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
              error={!!errors.userName}
              helperText={errors.userName}
            />
            <TextField
              required
              fullWidth
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              required
              fullWidth
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              required
              fullWidth
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              required
              fullWidth
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              error={!!errors.password}
              helperText={errors.password}
            />


                {/* Display an error message if the passwords do not match */}
                <TextField
                  label="Confirm Password"
                  required
                  variant="outlined"
                  fullWidth
                  type='password'
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    
                    // Validate password match as the user types
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      confirmPassword: e.target.value !== password ? "Passwords do not match." : "",
                    }));
                  }}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
  
  
            <Button type="submit" fullWidth variant="outlined">
              Sign Up
            </Button>
            <Button
            variant="outlined"
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