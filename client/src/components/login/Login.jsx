/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react'
import './login.css'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext, userDataContext } from '../zContextHooks/contextHooks'

//HELPER IMPORTS
import { changePage } from '../zzHelpers/helpers'

//FETCH IMPORTS
import { logIn } from '../zzzFetches/fetches'

const Login = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  //* FUNCTIONS
  const loginUser = async () => {
    setUserData(await logIn(userName, password))
  }

  //* USEEFFECTS

  //!!<<<DEBUG>>>
  useEffect(() => {
    if (pageToDisplay === 'login') {
      console.log('userData', userData)
    }
  }, [userData])
  //!!<<<END DEBUG>>>

  //* RENDER
  return (
    <>
      <div className="loginForm">
        {/* username login field */}
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value)
          }}
        />

        {/* password log in field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button onClick={() => loginUser()}>Login</button>
      </div>

      <div className="loginNavButtons">
        <button onClick={(e) => changePage(setPageToDisplay, 'register')}>
          Register
        </button>
        <button onClick={(e) => changePage(setPageToDisplay, 'landing')}>
          Back
        </button>
      </div>
    </>
  )
}

export default Login


