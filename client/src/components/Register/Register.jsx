/*
 * this component displays the registration page
  ? class names:
  registerForm
  error
  RegistrationNavButtonsWrap
  RegistrationNavButtons
 */

/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './register.css'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext, userDataContext } from '../zContextHooks/contextHooks'

//HELPER IMPORTS
import { changePage, validatePasswordCriteria } from '../zzHelpers/helpers'
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

  const [errors, setErrors] = useState({})

  //* FUNCTIONS
  const registerUser = async (evt) => {
    evt.preventDefault()
    if (!validateInputs()) return // stop submission if validation fails
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

  const validateInputs = async (evt) => {
    const newErrors = {}

    if (password != confirmPwd) {
      newErrors.confirmPwd = 'Passwords do not match.'
      return
    }

    if (!userName.trim()) newErrors.userName = 'Username is required.'
    if (!firstName.trim()) newErrors.firstName = 'First name is required.'
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.'
    console.log('this hits')
    if (!email.includes('@')) newErrors.firstName = 'Invalid email address.'

    if (validatePasswordCriteria(password))
      newErrors.password =
        'The password does not meet the requirements. It must be at least: 10 characters, have an upper and lower case character, a number and a symbol)'

    setErrors(newErrors)
    return Object.keys(newErrors).length == 0 // return whether the form is valid
  }

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
        {errors.userName && <p className="error">{errors.userName}</p>}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value)
          }}
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value)
          }}
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
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
        {errors.email && <p className="error">{errors.email}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPwd(e.target.value)
            validateInputs()
          }}
        />
        {errors.confirmedPwd && <p className="error">{errors.confirmedPwd}</p>}
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
