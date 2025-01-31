import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 10,
        left: 0,
        width: '100%',
        textAlign: 'center',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.secondary,
      }}
    >
      <Typography variant="body2" sx={{ margin: 0 }}>
        &copy; {currentYear} Your Site Name. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

