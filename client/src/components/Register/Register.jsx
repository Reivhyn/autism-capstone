import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { ptdContext } from '../zContextHooks/contextHooks';
import './register.css'; // Include custom styles if needed

// Custom Card styling
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  backgroundColor: 'rgba(2,0,36,1)',
  background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
  color: 'white', // Default text color inside card
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

const Register = () => {
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext);

  // State for form validation and input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name || name.length < 1) {
      setNameError(true);
      setNameErrorMessage('Full name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateInputs()) {
      console.log({
        name,
        email,
        password,
      });

      // You can handle the API call for registration here
      alert('Registration Successful!');
      setPageToDisplay('login'); // Navigate to login after successful registration
    }
  };

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <CssBaseline />
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: 'white' }}
        >
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {/* Full Name Field */}
          <FormControl>
            <FormLabel htmlFor="name" sx={{ color: 'white' }}>Full name</FormLabel>
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              placeholder="Jon Snow"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              helperText={nameErrorMessage}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white', border: '1px solid' }, 
                  '&:hover fieldset': { borderColor: 'white' }, 
                  '&.Mui-focused fieldset': { borderColor: 'white' }, 
                },
                input: { color: 'white' }, 
              }}
            />
          </FormControl>

          {/* Email Field */}
          <FormControl>
            <FormLabel htmlFor="email" sx={{ color: 'white' }}>Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailErrorMessage}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white', border: '1px solid' }, 
                  '&:hover fieldset': { borderColor: 'white' }, 
                  '&.Mui-focused fieldset': { borderColor: 'white' }, 
                },
                input: { color: 'white' }, 
              }}
            />
          </FormControl>

          {/* Password Field */}
          <FormControl>
            <FormLabel htmlFor="password" sx={{ color: 'white' }}>Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordErrorMessage}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white', border: '1px solid' }, 
                  '&:hover fieldset': { borderColor: 'white' }, 
                  '&.Mui-focused fieldset': { borderColor: 'white' }, 
                },
                input: { color: 'white' }, 
              }}
            />
          </FormControl>

          <Button type="submit" fullWidth variant="contained" sx={{ color: 'black', backgroundColor: 'white', '&:hover': { backgroundColor: 'gray' } }}>
            Sign Up
          </Button>
        </Box>
        <Divider sx={{ margin: '10px 0' }}>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center', color: 'white' }}>
            Already have an account?{' '}
            <Link
              component="button"
              onClick={() => setPageToDisplay('login')}
              variant="body2"
              sx={{ color: 'white' }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>
  );
};

export default Register;