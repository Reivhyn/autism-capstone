
import { useContext, useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Importing the icon
import { ptdContext } from '../zContextHooks/contextHooks';

const DropMenu = () => {
  const [, setPageToDisplay] = useContext(ptdContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (page) => {
    setPageToDisplay(page);
    handleClose();
  };

  return (
    <div className="dropMenu">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<MenuIcon />} // Adds the icon before the text
        sx={{
          backgroundColor: '#007bff', // Blue color
          color: 'white',
          '&:hover': {
            backgroundColor: '#0056b3', // Darker blue on hover
          },
          padding: '10px 20px',
          fontWeight: 'bold',
          borderRadius: '8px',
        }}
      >
        Site Navigation
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <MenuItem onClick={() => handleMenuItemClick('landing')}>Home</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('games')}>Games</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('learning')}>Learning Activities</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('chat')}>Chat</MenuItem>
      </Menu>
    </div>
  );
};

export default DropMenu;