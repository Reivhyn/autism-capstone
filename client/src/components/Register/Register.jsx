/*
 * this component displays the registration page
 */

/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './register.css'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext, userDataContext } from '../zContextHooks/contextHooks'

//HELPER IMPORTS
import { changePage } from '../zzHelpers/helpers'
import { register } from '../zzzFetches/fetches'

const Register = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dob = '1900-1-1'
  const userType = 'parent'
  const [confirmPwd, setConfirmPwd] = useState('')

  //* FUNCTIONS
  const registerUser = async (evt) => {
    evt.preventDefault()
    setUserData(
      await register(
        userName,
        firstName,
        lastName,
        email,
        password,
        dob,
        userType
      )
    )
  }

  const handleConfirmedPwd = async (evt) => {}

  //* RENDER
  return (
    <div>
      {/* registration form */}
      <h2>Register here</h2>
      <form action="" className="registerForm">
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value)
          }}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value)
          }}
        />
        {/* <input
          type="text"
          placeholder="Date of Brith"
          value={dob}
          onChange={(e) => {
            setdob(e.target.value)
          }}
        /> */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPwd(e.target.value)
            if (password != confirmPwd) {
              alert('Passwords do not match!')
              return
            }
          }}
        />
        <button onClick={(evt) => registerUser(evt)}>Register</button>
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
