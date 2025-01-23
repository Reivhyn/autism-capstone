/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react'
import './App.css'

// COMPONENT IMPORTS
import Login from './components/login/Login'
import Register from './components/Register/Register'
import Landing from './components/Landing/Landing'
import Activities from './components/Activities/Activities'
import Chat from './components/Chat/Chat'
import Portal from './components/Portal/Portal'
import DropMenu from './components/DropMenu/DropMenu'
import EditUser from './components/EditUser/EditUser.jsx'
import EditActivity from './components/EditActivity/EditActivity.jsx'

// CONTEXT IMPORTS
import {
  ptdContext,
  userDataContext,
  KidsOfParentContext,
  editTargetContext,
} from './components/zContextHooks/contextHooks'

// MATERIAL-UI IMPORTS
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import darkTheme from './Theme/theme.jsx'
import { Logout } from '@mui/icons-material'
import LogoutButton from './components/LogoutButton/LogoutButton.jsx'

function App() {
  //* USESTATE
  // State for page to display
  const [pageToDisplay, setPageToDisplay] = useState('landing')
  // State for user data
  const [userData, setUserData] = useState('')
  const [kidsOfParent, setKidsOfParent] = useState('')
  const [editTarget, setEditTarget] = useState('')

  //* FUNCTIONS

  //* USESTATES
  //try to session data on pageload
  useEffect(() => {
    const savedUserData = sessionStorage.getItem('userData')
    try {
      savedUserData === undefined ? '' : setUserData(JSON.parse(savedUserData)) // Default to an empty string if no value is saved
    } catch (error) {
      console.log('parse session storage failed', error)
    }
  }, [])

  //if userdata exist and user is admin or parent redirect to their portal
  useEffect(() => {
    if (userData) {
      if (userData.userType === 'admin') setPageToDisplay('admin')
      if (userData.userType === 'parent') setPageToDisplay('parent')
    }
  }, [userData])

  // save local data to session sorage
  useEffect(() => {
    if (userData) sessionStorage.setItem('userData', JSON.stringify(userData))
  }, [userData])

  return (
    <ThemeProvider theme={darkTheme}>
      {' '}
      {/* Wrap everything inside ThemeProvider */}
      <CssBaseline /> {/* To ensure consistent styling across all browsers */}
      <userDataContext.Provider value={[userData, setUserData]}>
        <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
          <KidsOfParentContext.Provider value={[kidsOfParent, setKidsOfParent]}>
            <editTargetContext.Provider value={[editTarget, setEditTarget]}>
              {userData ? <LogoutButton /> : ''}
              {/* Global DropMenu */}
              <DropMenu />

              {/* Page Rendering */}
              {pageToDisplay === 'login' && <Login />}
              {pageToDisplay === 'register' && <Register />}
              {pageToDisplay === 'landing' && <Landing />}
              {(pageToDisplay === 'games' || pageToDisplay === 'learning') && (
                <Activities />
              )}
              {pageToDisplay === 'chat' && <Chat />}
              {(pageToDisplay === 'admin' || pageToDisplay === 'parent') && (
                <Portal />
              )}
              {(pageToDisplay === 'editUser' ||
                pageToDisplay === 'addUser' ||
                pageToDisplay === 'editKid' ||
                pageToDisplay === 'addKid') && <EditUser />}
                {(pageToDisplay === 'editActivity' || pageToDisplay === 'addGame' || pageToDisplay === 'addLearning') && <EditActivity />}
            </editTargetContext.Provider>
          </KidsOfParentContext.Provider>
        </ptdContext.Provider>
      </userDataContext.Provider>
    </ThemeProvider>
  )
}

export default App
