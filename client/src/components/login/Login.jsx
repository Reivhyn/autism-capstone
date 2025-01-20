import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { ptdContext } from '../zContextHooks/contextHooks';
import './login.css';

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

const LoginContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

const Login = () => {
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext);

  // State for form validation and input
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [userIDError, setUserIDError] = useState(false);
  const [userIDErrorMessage, setUserIDErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const validateInputs = () => {
    let isValid = true;

    if (!userID || userID.trim() === '') {
      setUserIDError(true);
      setUserIDErrorMessage('UserID cannot be empty.');
      isValid = false;
    } else {
      setUserIDError(false);
      setUserIDErrorMessage('');
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateInputs()) {
      console.log({
        userID,
        password,
      });

      // You can handle the API call for login here
      alert('Login Successful!');
      setPageToDisplay('home'); // Navigate to home after successful login
    }
  };

  return (
    <LoginContainer direction="column" justifyContent="space-between">
      <CssBaseline />
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: 'black' }}
        >
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {/* UserID Field */}
          <FormControl>
            <FormLabel htmlFor="userID" sx={{ color: 'white' }}>UserID</FormLabel>
            <TextField
              required
              fullWidth
              id="userID"
              placeholder="Enter your UserID"
              name="userID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              error={userIDError}
              helperText={userIDErrorMessage}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black', border: '1px solid' }, 
                  '&:hover fieldset': { borderColor: 'black' }, 
                  '&.Mui-focused fieldset': { borderColor: 'black' }, 
                },
                input: { color: 'white' }, 
              }}
            />
          </FormControl>

          {/* Password Field */}
          <FormControl>
            <FormLabel htmlFor="password" sx={{ color: 'black' }}>Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordErrorMessage}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black', border: '1px solid' }, 
                  '&:hover fieldset': { borderColor: 'black' }, 
                  '&.Mui-focused fieldset': { borderColor: 'black' }, 
                },
                input: { color: 'black' }, 
              }}
            />
          </FormControl>

          <Button type="submit" fullWidth variant="contained" sx={{ color: 'black', backgroundColor: 'white', '&:hover': { backgroundColor: 'gray' } }}>
            Login
          </Button>
        </Box>
        <Divider sx={{ margin: '10px 0' }}>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center', color: 'black' }}>
            Don't have an account?{' '}
            <Link
              component="button"
              onClick={() => setPageToDisplay('register')}
              variant="body2"
              sx={{ color: 'black' }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Card>
    </LoginContainer>
  );
};

export default Login;