/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { ptdContext, userDataContext } from '../zContextHooks/contextHooks'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import './button.css'

export default function LoginRegisterButton() {
  const theme = useTheme()
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData] = useContext(userDataContext)
  return (
    <>
      {/* Site Title */}
      {!userData && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            color="theme.palette.primary.main"
            onClick={() => setPageToDisplay('login')}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="theme.palette.primary.main"
            onClick={() => setPageToDisplay('register')}
          >
            Register
          </Button>
        </Box>
      )}
    </>
  )
}
