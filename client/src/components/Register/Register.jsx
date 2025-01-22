import { useContext, useState } from 'react';
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
import { ptdContext } from '../zContextHooks/contextHooks';

const Register = () => {
  const [, setPageToDisplay] = useContext(ptdContext); // Using only `setPageToDisplay`

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      console.log({ username, firstName, lastName, email, password });
      alert('Registration Successful!');
      setPageToDisplay('portal'); // Navigate to the portal page after successful registration
    }
  };

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