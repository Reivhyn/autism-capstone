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
        marginTop: '40px',
        textAlign: 'center',
        padding: { xs: '16px', sm: '20px' },
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2" sx={{ margin: 0 }}>
        &copy; {currentYear} Your Site Name. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

