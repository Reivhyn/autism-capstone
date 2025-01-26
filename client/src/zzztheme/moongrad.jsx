import { createTheme } from '@mui/material/styles';

const moongrad = createTheme({
  palette: {
    primary: {
      main: '#1e2b4f', // Deep blue
    },
    secondary: {
      main: '#8b8cd4', // Lavender
    },
    background: {
      default: 'linear-gradient(180deg, #0c162d 0%, #1e2b4f 100%)', // Midnight gradient
      paper: 'linear-gradient(180deg, #1e2b4f 0%, #8b8cd4 100%)', // Subtle sky tones
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
          background: 'linear-gradient(90deg, #8b8cd4 0%, #1e2b4f 100%)', // Lavender to blue gradient
          color: '#ffffff',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            background: 'linear-gradient(90deg, #1e2b4f 0%, #8b8cd4 100%)', // Reverse gradient on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(180deg, #0c162d 0%, #1e2b4f 100%)', // Seamless with background
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(180deg, #1e2b4f 0%, #8b8cd4 100%)', // Subtle gradient for cards
          color: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
});

export default moongrad;
