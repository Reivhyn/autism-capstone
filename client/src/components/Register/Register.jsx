/*
 * this component displays the registration page
 */

/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './register.css'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/contextHooks'

//HELPER IMPORTS
import { changePage } from '../zzHelpers/helpers'

const Register = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)

  //* RENDER
  return (
    <div>
      {/* registration form */}
      <h2>Register here</h2>
      <form action="" className="registerForm">
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <input type="button" name="" value="Register" />
      </form>

      {/* nav buttons */}
      <div className="RegistrationNavButtonsWrap">
        {/* login button */}
        <button
          className="RegistrationNavButtons"
          onClick={() => changePage(setPageToDisplay, 'login')}
        >
          Login
        </button>

        {/* back button */}
        <button
          className="RegistrationNavButtons"
          onClick={() => changePage(setPageToDisplay, 'landing')}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default Register
