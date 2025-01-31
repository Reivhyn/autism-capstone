import { createTheme } from '@mui/material/styles';

const baseTypography = {
  fontFamily: 'Roboto, Arial, sans-serif',
  h1: { fontSize: '2rem', fontWeight: 700 },
  h2: { fontSize: '1.75rem', fontWeight: 600 },
  h6: { fontSize: '1.25rem', fontWeight: 500 },
  body1: { fontSize: '1rem', fontWeight: 400 },
  body2: { fontSize: '0.875rem', fontWeight: 400 },
  button: { textTransform: 'none', fontWeight: 500 },
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#A3C9A8' }, // Light green
    secondary: { main: '#E7B8A5' }, // Peach
    background: { default: '#1C2629', paper: '#304B54' }, // Dark teal shades
    text: { primary: '#FFFFFF', secondary: '#E7B8A5' }, // White text for readability
  },
  typography: {
    ...baseTypography,
    h1: { ...baseTypography.h1, color: '#A3C9A8' },
    h2: { ...baseTypography.h2, color: '#E7B8A5' },
    h6: { ...baseTypography.h6, color: '#FFFFFF' },
    body1: { ...baseTypography.body1, color: '#FFFFFF' },
  },
});

export const evening = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#494E6B' }, // Stormy gray
    secondary: { main: '#985E6D' }, // Sunset pink
    background: { default: '#192231', paper: '#3A3F58' }, // Evening tones
    text: { primary: '#F5F5F5', secondary: '#C0C0C0' }, // Off-white for readability
  },
  typography: {
    ...baseTypography,
    h1: { ...baseTypography.h1, color: '#F5F5F5' },
    h2: { ...baseTypography.h2, color: '#C0C0C0' },
    h6: { ...baseTypography.h6, color: '#F5F5F5' },
    body1: { ...baseTypography.body1, color: '#DADADA' },
  },
});

export const moon = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1e2b4f' }, // Deep blue
    secondary: { main: '#8b8cd4' }, // Lavender
    background: { default: '#0c162d', paper: '#1e2b4f' }, // Midnight shades
    text: { primary: '#ffffff', secondary: '#e3d5f7' }, // White for readability
  },
  typography: {
    ...baseTypography,
    h1: { ...baseTypography.h1, color: '#ffffff' },
    h2: { ...baseTypography.h2, color: '#8b8cd4' },
    h6: { ...baseTypography.h6, color: '#ffffff' },
    body1: { ...baseTypography.body1, color: '#e3d5f7' },
  },
});

export const synth = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff6ec7' }, // Vibrant pink
    secondary: { main: '#6e6eff' }, // Neon blue
    background: { default: '#1a1a1a', paper: '#242424' }, // Dark gray
    text: { primary: '#d1e3ff', secondary: '#a9b8d4' }, // Light blue text
  },
  typography: {
    ...baseTypography,
    h1: { ...baseTypography.h1, color: '#ff6ec7' },
    h2: { ...baseTypography.h2, color: '#6e6eff' },
    h6: { ...baseTypography.h6, color: '#d1e3ff' },
    body1: { ...baseTypography.body1, color: '#d1e3ff' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#3a3a3a',
          color: '#d1e3ff',
          borderRadius: '8px',
          padding: '10px 20px',
          '&:hover': { backgroundColor: '#4a4a4a' },
        },
      },
    },
  },
});

export const day = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#FF5722' }, // Orange
    secondary: { main: '#2196F3' }, // Blue
    background: { default: '#F5F5F5', paper: '#FFFFFF' }, // Soft off-white
    text: { primary: '#000000', secondary: '#757575' }, // Black text for contrast
  },
  typography: {
    ...baseTypography,
    h1: { ...baseTypography.h1, color: '#FF5722' },
    h2: { ...baseTypography.h2, color: '#2196F3' },
    h6: { ...baseTypography.h6, color: '#000000' },
    body1: { ...baseTypography.body1, color: '#000000' },
  },
});

