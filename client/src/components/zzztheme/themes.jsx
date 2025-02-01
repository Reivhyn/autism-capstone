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
    primary: { main: '#2a3e7f' }, // Richer deep blue for better visibility
    secondary: { main: '#7a8bb8' }, // Softer lavender for better contrast
    background: { default: '#0c162d', paper: '#1e2b4f' }, // Midnight shades
    text: { primary: '#ffffff', secondary: '#d1c6f7' }, // Light text for contrast
  },
  typography: {
    ...baseTypography,
    h1: { ...baseTypography.h1, color: '#ffffff' },
    h2: { ...baseTypography.h2, color: '#d1c6f7' }, // Soft lavender to match secondary
    h6: { ...baseTypography.h6, color: '#ffffff' },
    body1: { ...baseTypography.body1, color: '#d1c6f7' }, // Softer color for body text
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
    primary: { main: '#8C3A0C' }, // Deep burnt orange
    secondary: { main: '#1976D2' }, // Muted blue for contrast
    background: { default: '#E3D5C0', paper: '#F2E6D0' }, // Parchment-like colors
    text: { primary: '#3D2B1F', secondary: '#5C4B3B' }, // Warm brown tones for readability
  },
  typography: {
    ...baseTypography,
    h1: { ...baseTypography.h1, color: '#8C3A0C' }, // Dark burnt orange for headings
    h2: { ...baseTypography.h2, color: '#145A8D' }, // Slightly darker blue
    h6: { ...baseTypography.h6, color: '#3D2B1F' }, // Deep brown for text
    body1: { ...baseTypography.body1, color: '#3D2B1F' }, // Warm dark brown for better readability
  },
});

