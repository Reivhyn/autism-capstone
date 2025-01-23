import React from 'react'
import './logout.css';

const LogoutButton = () => {
  //* FUNCTIONS
  // logs out and deletes cookie and sessioon storage
  const logout = () => {
    document.cookie = `authToken=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    sessionStorage.clear()
    window.location.reload(true)
  }

  //* RENDER
  return (
    <>
      <button onClick={logout} className="logOutButton">
        Logout
      </button>
    </>
  )
}

export default LogoutButton
