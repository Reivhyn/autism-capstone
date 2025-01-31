/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useContext} from 'react'
import { ptdContext } from '../zContextHooks/contextHooks'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import './SiteTitle.css'


const SiteTitle = () => {
  const theme = useTheme()
  const [pageToDisplay , setPageToDisplay] = useContext(ptdContext)
  return (
  <>
  {/* Site Title */}
  {pageToDisplay === 'landing' ? (
    <Typography
      variant="h1"
      sx={{
        color: theme.palette.primary.main,
        fontSize: '3rem',
        textAlign: 'center',
        margin: '0.5rem 0',
        padding: '1rem',
      }}
    >
      Welcome To The Imagination Treehouse!
    </Typography>
    ) : (
      <Typography
      variant="h1"
      sx={{
        color: theme.palette.primary.main,
        fontSize: '3rem',
        textAlign: 'center',
        margin: '0.5rem 0',
        padding: '1rem',
      }}
    >
      Imagination Treehouse
    </Typography>
    )}


  </>
  )
}


export default SiteTitle