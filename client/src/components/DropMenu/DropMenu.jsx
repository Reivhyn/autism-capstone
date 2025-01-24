import { useContext, useState } from 'react';
import { Menu, MenuItem, Button, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ptdContext } from '../zContextHooks/contextHooks';
import './dropMenu.css';

const DropMenu = () => {
  const [, setPageToDisplay] = useContext(ptdContext);
  const [anchorEl, setAnchorEl] = useState(null);

  // Access the theme
  const theme = useTheme();

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
        startIcon={<MenuIcon />}
        sx={{
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: theme.palette.text.primary,
          '&:hover': {
            background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
          },
          padding: '10px 20px',
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
        PaperProps={{
          style: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
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
