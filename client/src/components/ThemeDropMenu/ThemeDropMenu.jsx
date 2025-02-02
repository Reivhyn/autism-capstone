import React, { useState, useContext, useEffect } from 'react'

//CONTEXT IMPORTS
import { activeThemeContext } from '../zContextHooks/contextHooks'

// MUI IMPORTS
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'

const ThemeDropMenu = () => {
  //* USESTATE
  const [displayList, setdisplayList] = useState('')
  const [activeTheme, setActiveTheme] = useContext(activeThemeContext)
  const [anchorEl, setAnchorEl] = React.useState('')
  const open = Boolean(anchorEl)

  //array that has names of all themes
  const themeStringNamesArr = ['Dark', 'Evening', 'Moon', 'Synth', 'Parchment']

  //* FUNCTIONS
  // handle open for menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  //handle close for menu
  const handleClose = () => {
    setAnchorEl(null)
  }

  //* USEEFFECT

  //render list
  useEffect(() => {
    setdisplayList(
      themeStringNamesArr.map((theme) => {
        return (
          <MenuItem
            className="themeNames"
            key={theme}
            onClick={() => {
              setActiveTheme(theme)
              handleClose()
            }}
          >
            {theme}
          </MenuItem>
        )
      })
    )
  }, [])

  //* RENDER
  return (
    <div>
      <Button
        variant="outlined"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        startIcon={<MenuIcon />}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Theme: {activeTheme ? activeTheme : 'Dark'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {displayList ? displayList : 'No Themes Found'}
      </Menu>
    </div>
  )
}
export default ThemeDropMenu