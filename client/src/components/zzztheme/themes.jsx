import { createTheme } from '@mui/material/styles';

const baseTypography = {
  fontFamily: 'Roboto, Arial, sans-serif',
  h1: { fontSize: '2rem', fontWeight: 700 },
  h2: { fontSize: '1.75rem', fontWeight: 600 },
  h6: { fontSize: '1.25rem', fontWeight: 400 },
  h3: { fontSize: '1.5rem', fontWeight: 500 },
  body1: { fontSize: '1rem', fontWeight: 400 },
  body2: { fontSize: '0.875rem', fontWeight: 'bold'},
  body3: { fontSize: '0.85rem', fontWeight: 'bold' },
  button: { textTransform: 'none', fontWeight: 500 },
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#A3C9A8' },
    secondary: { main: '#E7B8A5' },
    background: { default: '#1C2629', paper: '#304B54' },
    text: { primary: '#FFFFFF', secondary: '#E7B8A5' },
  },
  typography: {
    ...baseTypography,
    h1: { ...baseTypography.h1, color: '#A3C9A8' },
    h2: { ...baseTypography.h2, color: '#E7B8A5' },
    h6: { ...baseTypography.h6, color: '#FF5722' },
    body1: { ...baseTypography.body1, color: '#FFFFFF' },
    body2: { ...baseTypography.body2, color: '#E7B8A5' },
    body3: { ...baseTypography.body3, color: '#FFFFFF' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.text.primary,
          borderRadius: '8px',
          padding: '10px 20px',
          '&:hover': { backgroundColor: '#4A4A4A' },
        },
      },
    },
  },
});

export const evening = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#c35b1d' },
    secondary: { main: '#985E6D' },
    background: { default: '#192231', paper: '#3A3F58' },
    text: { primary: '#F5F5F5', secondary: '#C0C0C0' },
  },
  typography: {
    ...baseTypography,
    h1: { ...baseTypography.h1, color: '#F5F5F5' },
    h2: { ...baseTypography.h2, color: '#C0C0C0' },
    h6: { fontSize: '1.25rem', fontWeight: 400, color: '#C0C0C0' },
    body1: { ...baseTypography.body1, color: '#DADADA' },
    body2: { ...baseTypography.body2, color: '#C0C0C0' },
    body3: { ...baseTypography.body3, color: '#F5F5F5' },
  },
});

export const moon = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2a3e7f' },
    secondary: { main: '#7a8bb8' },
    background: { default: '#0c162d', paper: '#1e2b4f' },
    text: { primary: '#ffffff', secondary: '#d1c6f7' },
  },
  typography: {
    ...baseTypography,
    h1: { ...baseTypography.h1, color: '#ffffff' },
    h2: { ...baseTypography.h2, color: '#d1c6f7' },
    h6: { ...baseTypography.h6, color: '#ffffff' },
    body1: { ...baseTypography.body1, color: '#d1c6f7' },
    body2: { ...baseTypography.body2, color: '#d1c6f7' },
    body3: { ...baseTypography.body3, color: '#ffffff' },
  },
});

export const synth = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff6ec7' },
    secondary: { main: '#6e6eff' },
    background: { default: '#1a1a1a', paper: '#242424' },
    text: { primary: '#d1e3ff', secondary: '#a9b8d4' },
  },
  typography: {
    ...baseTypography,
    h1: { ...baseTypography.h1, color: '#ff6ec7' },
    h2: { ...baseTypography.h2, color: '#6e6eff' },
    h6: { fontSize: '1.25rem', fontWeight: 400, color: '#6e6eff' },
    body1: { ...baseTypography.body1, color: '#d1e3ff' },
    body2: { ...baseTypography.body2, color: '#a9b8d4' },
    body3: { ...baseTypography.body3, color: '#d1e3ff' },
  },
});

export const parchment = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#8C3A0C' },
    secondary: { main: '#326BBB' },
    background: { default: '#f7f1e9', paper: '#F2E6D0' },
    text: { primary: '#3D2B1F', secondary: '#5C4B3B' },
  },
  typography: {
    ...baseTypography,
    h1: { ...baseTypography.h1, color: '#8C3A0C' },
    h2: { ...baseTypography.h2, color: '#145A8D' },
    h6: { ...baseTypography.h6, color: '#3D2B1F' },
    body1: { ...baseTypography.body1, color: '#3D2B1F' },
    body2: { ...baseTypography.body2, color: '#5C4B3B' },
    body3: { ...baseTypography.body3, color: '#3D2B1F' },
  },
});
