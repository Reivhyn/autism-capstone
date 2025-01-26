import React, { useContext, useEffect, useMemo, useState } from 'react'
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
import EditChatTopic from './components/EditChatTopic/EditChatTopic.jsx'
import LogoutButton from './components/LogoutButton/LogoutButton.jsx'
import PleaseLogin from './components/PleaseLogIn/PleaseLogin.jsx'

// CONTEXT IMPORTS
import {
  ptdContext,
  userDataContext,
  editTargetContext,
  KidsOfParentContext,
} from './components/zContextHooks/contextHooks'

// MATERIAL-UI IMPORTS
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import darkTheme from './zzztheme/darkTheme.jsx'
import moongrad from './zzztheme/moongrad.jsx'
import { LogoutOutlined } from '@mui/icons-material'
import { ThemeContext } from '@emotion/react'
import lightTheme from './zzztheme/lightTheme.jsx'

function App() {
  const [pageToDisplay, setPageToDisplay] = useState('landing')
  const [userData, setUserData] = useState('')
  const [kidsOfParent, setKidsOfParent] = useState('')
  const [editTarget, setEditTarget] = useState('')
  const [themeName, setThemeName] = useState()

  //* FUNCTIONS
  const theme = useMemo(() => {
    switch (themeName) {
      case 'light':
        return lightTheme
      default:
        return darkTheme
    }
  })

  //* USESTATES
  //try to get session data on pageload
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
        console.log('userData', userData)
    }
  }, [userData])

  // save local data to session sorage
  useEffect(() => {
    if (userData) sessionStorage.setItem('userData', JSON.stringify(userData))
  }, [userData])

  useEffect(() => {
    console.log('pageToDisplay', pageToDisplay)
  },[pageToDisplay])

  //* RENDERING
  return (
    <ThemeContext.Provider value={(themeName, setThemeName)}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <userDataContext.Provider value={[userData, setUserData]}>
          <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
            <KidsOfParentContext.Provider
              value={[kidsOfParent, setKidsOfParent]}
            >
              {/* please log in - shoews if trying to access other sights without login */}
              {pageToDisplay !== 'landing' &&
                pageToDisplay !== 'login' &&
                pageToDisplay !== 'register' &&
                !userData && <PleaseLogin />}

              <editTargetContext.Provider value={[editTarget, setEditTarget]}>
                {/* Conditionally Render DropMenu */}
                {['learning', 'games', 'chat'].includes(pageToDisplay) && userData && (
                  <DropMenu />
                )}

                {/* render logout button once logged in */}
                {userData ? <LogoutButton /> : ''}

                {/*//*  Page Rendering */}
                {/* login page */}
                {pageToDisplay === 'login'&& <Login />}

                {/* registration gage */}
                {pageToDisplay === 'register' && <Register />}

                {/* home page */}
                {pageToDisplay === 'landing' && <Landing />}

                {/* games and lerning  pages */}
                {(pageToDisplay === 'games' ||
                  pageToDisplay === 'learning') && userData && <Activities />}

                {/* chat page */}
                {pageToDisplay === 'chat' && userData && <Chat />}

                {/* admin and parent portal pages */}
                {(pageToDisplay === 'admin' || pageToDisplay === 'parent') && userData && (
                  <Portal />
                )}

                {/* edit user page */}
                {(pageToDisplay === 'editUser' ||
                  pageToDisplay === 'addUser' ||
                  pageToDisplay === 'editKid' ||
                  pageToDisplay === 'addKid') && userData && <EditUser />}

                {/* edit chat topic page */}
                {(pageToDisplay === 'editChatTopic' ||
                  pageToDisplay === 'addChatTopic') && userData && <EditChatTopic />}
              </editTargetContext.Provider>
            </KidsOfParentContext.Provider>
          </ptdContext.Provider>
        </userDataContext.Provider>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default App
