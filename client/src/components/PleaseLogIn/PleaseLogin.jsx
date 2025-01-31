import React, { useContext, useEffect, useState } from 'react'
import './pleaseLogin.css'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/contextHooks'
import LoginRegisterButton from '../LoginRegisterButton/LoginRegisterButton'
import { Box, Button, Typography } from '@mui/material'

const PleaseLogin = () => {
  //* USESTATE
  const [pageToDisplay,setPageToDisplay] = useContext(ptdContext)

  //* RENDER
  return (
    <>
      <Typography variant='h2'>Please Login or Register</Typography>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', padding: '2rem' }}>
        <LoginRegisterButton />
        <Button
          variant='outlined'
          color='theme.palette.primary.main'
          onClick={() => setPageToDisplay('landing')}>Home</Button>
      </Box>
    </>
  )
}

export default PleaseLogin
