import  { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
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
  color: 'black',
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
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const validateInputs = () => {
    let isValid = true;

    if (!username) {
      setUsernameError(true);
      isValid = false;
    } else {
      setUsernameError(false);
    }

    if (!firstName) {
      setFirstNameError(true);
      isValid = false;
    } else {
      setFirstNameError(false);
    }

    if (!lastName) {
      setLastNameError(true);
      isValid = false;
    } else {
      setLastNameError(false);
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      isValid = false;
    } else {
      setConfirmPasswordError(false);
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateInputs()) {
      console.log({
        username,
        firstName,
        lastName,
        email,
        password,
      });

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
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: 'black' }}
        >
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {/* Username Field */}
          <TextField
            required
            fullWidth
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError}
            helperText={usernameError && 'Username is required.'}
          />

          {/* First Name Field */}
          <TextField
            required
            fullWidth
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={firstNameError}
            helperText={firstNameError && 'First name is required.'}
          />

          {/* Last Name Field */}
          <TextField
            required
            fullWidth
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={lastNameError}
            helperText={lastNameError && 'Last name is required.'}
          />

          {/* Email Field */}
          <TextField
            required
            fullWidth
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError && 'Please enter a valid email address.'}
          />

          {/* Password Field */}
          <TextField
            required
            fullWidth
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError && 'Password must be at least 6 characters.'}
          />

          {/* Confirm Password Field */}
          <TextField
            required
            fullWidth
            id="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPasswordError}
            helperText={confirmPasswordError && 'Passwords must match.'}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ color: 'black', backgroundColor: 'white', '&:hover': { backgroundColor: 'gray' } }}>
            Sign Up
          </Button>
        </Box>
        <Divider sx={{ margin: '10px 0' }}>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center', color: 'black' }}>
            Already have an account?{' '}
            <Link
              component="button"
              onClick={() => setPageToDisplay('login')}
              variant="body2"
              sx={{ color: 'black' }}
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