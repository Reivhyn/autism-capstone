import React, { useContext, useEffect, useState } from 'react'
import './pleaseLogin.css'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/contextHooks'

const PleaseLogin = () => {
  //* USESTATE
  const [pageToDisplay,setPageToDisplay] = useContext(ptdContext)

  //* RENDER
  return (
    <>
      <h1>Please Login or Register</h1>
      <div>
        <button onClick={() => setPageToDisplay('login')}>Login</button>
        <button onClick={() => setPageToDisplay('register')}>Register</button>
        <button onClick={() => setPageToDisplay('landing')}>Home</button>
      </div>
    </>
  )
}

export default PleaseLogin
