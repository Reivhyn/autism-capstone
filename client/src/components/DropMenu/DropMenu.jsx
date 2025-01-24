
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
          backgroundColor: theme.palette.primary.main, // Light green button
          color: theme.palette.background.default, // Contrast dark text
          '&:hover': {
            backgroundColor: theme.palette.secondary.main, // Peach on hover
          },
          padding: '10px 20px',
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
        PaperProps={{
          style: {
            backgroundColor: theme.palette.background.paper, // Deep teal menu
            color: theme.palette.text.primary, // White text
            borderRadius: '8px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <MenuItem
          onClick={() => handleMenuItemClick('landing')}
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.primary.main, // Light green hover
              color: theme.palette.background.default, // Contrast text
            },
          }}
        >
          Home
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick('learning')}
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.default,
            },
          }}
        >
          Learning Activities
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick('games')}
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.default,
            },
          }}
        >
          Games
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick('chat')}
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.default,
            },
          }}
        >
          Chat
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropMenu;