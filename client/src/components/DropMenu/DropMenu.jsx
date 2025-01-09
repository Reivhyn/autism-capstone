import { useContext, useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { ptdContext } from '../zContextHooks/contextHooks';

const DropMenu = () => {
  const [, setPageToDisplay] = useContext(ptdContext); // Use only setPageToDisplay
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (page) => {
    setPageToDisplay(page); // Update the pageToDisplay state
    handleClose();
  };

  return (
    <div className="dropMenu">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
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
        <MenuItem onClick={() => handleMenuItemClick('learning')}>Learning Activities</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('games')}>Games</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('chat')}>Chat</MenuItem>
      </Menu>
    </div>
  );
};

export default DropMenu;
