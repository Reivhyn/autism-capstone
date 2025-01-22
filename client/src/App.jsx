import React, { useContext, useEffect, useState } from 'react'
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

import darkTheme from './Theme/theme.jsx'
import { LogoutOutlined } from '@mui/icons-material'

function App() {
  const [pageToDisplay, setPageToDisplay] = useState('landing')
  const [userData, setUserData] = useState('')
  const [kidsOfParent, setKidsOfParent] = useState('')
  const [editTarget, setEditTarget] = useState('')

  //* FUNCTIONS

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
    }
  }, [userData])

  // save local data to session sorage
  useEffect(() => {
    if (userData) sessionStorage.setItem('userData', JSON.stringify(userData))
  }, [userData])

  //* RENDERING
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <userDataContext.Provider value={[userData, setUserData]}>
        <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
          <KidsOfParentContext.Provider value={[kidsOfParent, setKidsOfParent]}>
            <editTargetContext.Provider value={[editTarget, setEditTarget]}>
              {/* Conditionally Render DropMenu */}
              {['learning', 'games', 'chat'].includes(pageToDisplay) && (
                <DropMenu />
              )}

              {/* render logout button once logged in */}
              {userData ? <LogoutButton /> : ''  }

              {/*//*  Page Rendering */}
              {/* login page */}
              {pageToDisplay === 'login' && !userData && <Login />}

              {/* registration gage */}
              {pageToDisplay === 'register' && !userData && <Register />}

              {/* home page */}
              {pageToDisplay === 'landing' && <Landing />}

              {/* games and lerning  pages */}
              {(pageToDisplay === 'games' || pageToDisplay === 'learning') && (
                <Activities />
              )}

              {/* chat page */}
              {pageToDisplay === 'chat' && <Chat />}

              {/* admin and parent portal pages */}
              {(pageToDisplay === 'admin' || pageToDisplay === 'parent') && (
                <Portal />
              )}

              {/* edit user page */}
              {(pageToDisplay === 'editUser' ||
                pageToDisplay === 'addUser' ||
                pageToDisplay === 'editKid' ||
                pageToDisplay === 'addKid') && <EditUser />}

              {/* edit chat topic page */}
              {(pageToDisplay === 'editChatTopic' ||
                pageToDisplay === 'addChatTopic') && <EditChatTopic />}
            </editTargetContext.Provider>
          </KidsOfParentContext.Provider>
        </ptdContext.Provider>
      </userDataContext.Provider>
    </ThemeProvider>
  )
}

export default App
