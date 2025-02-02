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
      <Typography variant='h2' margin={2} marginTop={4} marginBottom={4}>Please Login or Register</Typography>
      <Button onClick={() => setPageToDisplay('landing')} variant='outlined'>Back</Button>
    </>
  )
}

export default PleaseLogin
