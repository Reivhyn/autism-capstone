import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import './login.css';

// CONTEXT IMPORTS
import { ptdContext, userDataContext } from '../zContextHooks/contextHooks';

// FETCH IMPORTS
import { logIn } from '../zzzFetches/fetches';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#121212', // Dark background
  color: 'white', // Light text color
  boxShadow: 'none', // Remove default shadow
  border: '1px solid #333', // Subtle border for contrast
}));

const Login = () => {
  // CONTEXT
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext);
  const [userData, setUserData] = useContext(userDataContext);

  // STATE
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  // VALIDATION
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

    return isValid;
  };

  // LOGIN FUNCTION
  const loginUser = async () => {
    if (validateInputs()) {
      const user = await logIn(email, password);
      setUserData(user);
    }
  };

  // REDIRECT AFTER LOGIN
  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        if (userData.userType === 'admin') {
          setPageToDisplay('admin');
        } else if (userData.userType === 'parent') {
          setPageToDisplay('parent');
        } else if (userData.userType === 'kid') {
          setPageToDisplay('landing');
        }
      }, 500);
    }
  }, [userData]);

  // RENDER
  return (
    <Box
    component="div"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '16px',
      backgroundColor: '#121212', // Dark background
      color: 'white', // Ensure text is visible on dark background
    }}
  >
      <CssBaseline />
      <Card variant="outlined">
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          {/* Email Field */}
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
            label="Email"
          />
          {/* Password Field */}
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
            label="Password"
          />
          {/* Remember Me */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* Login Button */}
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={loginUser}
          >
            Login
          </Button>
          {/* Navigation Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 2,
            }}
          >
            <Button
              variant="text"
              onClick={() => setPageToDisplay('register')}
            >
              Register
            </Button>
            <Button
              variant="text"
              onClick={() => setPageToDisplay('landing')}
            >
              Back
            </Button>
          </Box>
        </Box>
        <Divider>or</Divider>
        {/* Social Buttons */}
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Google')}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Facebook')}
        >
          Sign in with Facebook
        </Button>
      </Card>
    </Box>
  );
};

export default Login;