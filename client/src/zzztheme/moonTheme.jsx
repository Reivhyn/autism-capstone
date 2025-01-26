import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e2b4f', // Deep blue
    },
    secondary: {
      main: '#8b8cd4', // Lavender
    },
    background: {
      default: '#0c162d', // Midnight blue
      paper: '#1e2b4f', // Slightly lighter for contrast
    },
    text: {
      primary: '#ffffff', // White for readability
      secondary: '#e3d5f7', // Pale pink for accents
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      color: '#ffffff',
    },
    h2: {
      color: '#8b8cd4',
    },
    body1: {
      color: '#e3d5f7',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
