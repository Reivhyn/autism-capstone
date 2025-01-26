import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
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

export const evening = createTheme({
  palette: {
    primary: {
      main: '#494E6B', // Stormy
    },
    secondary: {
      main: '#985E6D', // Sunset
    },
    background: {
      default: '#192231', // Evening
      paper: '#98878F', // Cloud
    },
    text: {
      primary: '#F5F5F5', // Off-white
      secondary: '#DADADA', // Slightly dimmer off-white
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      color: '#F5F5F5', // Off-white
    },
    h2: {
      color: '#F5F5F5', // Off-white
    },
    body1: {
      color: '#DADADA', // Slightly dimmer off-white for body text
    },
  },
});

export const moon = createTheme({
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

export const synth = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6ec7', // Vibrant pink for primary actions
    },
    secondary: {
      main: '#6e6eff', // Neon blue for secondary actions
    },
    background: {
      default: '#1a1a1a', // Very dark gray for the main background
      paper: '#242424', // Slightly lighter gray for cards/dialogs
    },
    text: {
      primary: '#d1e3ff', // Off-white with a hint of blue for primary text
      secondary: '#a9b8d4', // Softer blue-gray for secondary text
    },
  },
  typography: {
    fontFamily: `'Poppins', 'Roboto', 'Arial', sans-serif`, // Clean, modern font stack
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#ff6ec7', // Pink for headings
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#6e6eff', // Blue for subheadings
    },
    body1: {
      fontSize: '1rem',
      color: '#d1e3ff', // Use the new off-white color for body text
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 600,
      color: '#d1e3ff', // Buttons should have off-white text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#3a3a3a', // Dark gray button background
          color: '#d1e3ff', // Off-white text on buttons
          borderRadius: '20px', // Rounded style for buttons
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: '#4a4a4a', // Slightly lighter gray on hover
          },
        },
      },
    },
  },
});

export const day = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF5722', // Orange
    },
    secondary: {
      main: '#2196F3', // Blue
    },
    background: {
      default: '#F5F5F5', // Softer off-white background
      paper: '#FFFFFF', // White paper, can be adjusted too if desired
    },
    text: {
      primary: '#000000', // Black text for readability
      secondary: '#757575', // Lighter text color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
