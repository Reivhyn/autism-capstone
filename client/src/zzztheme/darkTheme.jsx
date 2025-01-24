import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#A3C9A8', // Light green
    },
    secondary: {
      main: '#E7B8A5', // Peach
    },
    background: {
      default: '#1C2629', // Dark navy/teal for app background
      paper: '#304B54', // Deep teal for cards/paper
    },
    text: {
      primary: '#FFFFFF', // White text for readability
      secondary: '#DD5E56', // Vibrant coral red for highlights
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      color: '#A3C9A8',
    },
    h2: {
      color: '#E7B8A5',
    },
    body1: {
      color: '#FFFFFF',
    },
    body2: {
      color: '#DD5E56',
    },
  },
});

export default darkTheme;
