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
    variant='outlined'
      onClick={logout}
      sx={{
        position: 'absolute',
        right: '10px',
        top: '10px',
        padding: '10px 20px',
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
