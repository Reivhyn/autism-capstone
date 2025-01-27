import React from 'react';
import { useTheme, Button } from '@mui/material';

const LogoutButton = () => {
  const theme = useTheme();

  // Logs out and deletes cookies and session storage
  const logout = () => {
    document.cookie = `authToken=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    sessionStorage.clear();
    window.location.reload(true);
  };

  return (
    <Button
      onClick={logout}
      sx={{
        position: 'absolute',
        right: '10px',
        top: '10px',
        padding: '10px 20px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '12px',
        fontSize: '13px',
        zIndex: 1000,
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
