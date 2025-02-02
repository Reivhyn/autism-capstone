/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useMemo, useState } from 'react'
import './App.css'

// COMPONENT IMPORTS
import Logo from './components/Logo/Logo.jsx'
import Login from './components/login/Login'
import Register from './components/Register/Register'
import Landing from './components/Landing/Landing'
import Activities from './components/Activities/Activities'
import Chat from './components/Chat/Chat'
import Portal from './components/Portal/Portal'
import DropMenu from './components/DropMenu/DropMenu'
import EditUser from './components/EditUser/EditUser.jsx'
import EditActivity from './components/EditActivity/EditActivity.jsx'
import EditChatTopic from './components/EditChatTopic/EditChatTopic.jsx'
import LogoutButton from './components/LogoutButton/LogoutButton.jsx'
import PleaseLogin from './components/PleaseLogIn/PleaseLogin.jsx'
import ThemeDropMenu from './components/ThemeDropMenu/ThemeDropMenu.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginRegisterButton from './components/LoginRegisterButton/LoginRegisterButton.jsx'

// CONTEXT IMPORTS
import {
  ptdContext,
  userDataContext,
  editTargetContext,
  KidsOfParentContext,
  activeThemeContext,
} from './components/zContextHooks/contextHooks'

// MATERIAL-UI IMPORTS
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Cookie, LogoutOutlined } from '@mui/icons-material'
import { ThemeContext } from '@emotion/react'

//theme imports
import {
  darkTheme,
  evening,
  moon,
  synth,
  day,
} from './components/zzztheme/themes.jsx'
import { Box } from '@mui/material'

function App() {
  const [pageToDisplay, setPageToDisplay] = useState('landing')
  const [userData, setUserData] = useState('')
  const [kidsOfParent, setKidsOfParent] = useState('')
  const [editTarget, setEditTarget] = useState('')
  const [activeTheme, setActiveTheme] = useState('')

  //* USESTATES
  //try to get session data on pageload and prefered theme
  useEffect(() => {
    try {
      const savedUserData = sessionStorage.getItem('userData')
      savedUserData === undefined ? '' : setUserData(JSON.parse(savedUserData)) // Default to an empty string if no value is saved
    } catch (error) {
      console.log('parse session storage failed', error)
    }

    // try to get saved theme
    try {
      const savedTheme = localStorage.getItem('themePreference')
      savedTheme === undefined ? '' : setActiveTheme(JSON.parse(savedTheme))
    } catch (error) {
      console.log('parse local storage failed', error)
    }
  }, [])

  //* FUNCTIONS
  const theme = useMemo(() => {
    switch (activeTheme) {
      case 'Evening':
        return evening
      case 'Moon':
        return moon
      case 'Synth':
        return synth
      case 'Day':
        return day
      default:
        return darkTheme
    }
  })

  //* USEEFFECTS
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

  useEffect(() => {
    if (activeTheme)
      localStorage.setItem('themePreference', JSON.stringify(activeTheme))
  }, [activeTheme])

  //* RENDERING
  return (
    <activeThemeContext.Provider value={[activeTheme, setActiveTheme]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <userDataContext.Provider value={[userData, setUserData]}>
          <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
            <KidsOfParentContext.Provider
              value={[kidsOfParent, setKidsOfParent]}
            >
                
                {/*//*  Header */}


                {/*//*  Header */}
{/*//*  Header */}
<Box sx={{ display: 'flex',  alignItems: 'center',  gap:2,   ...(pageToDisplay === 'login' || pageToDisplay === 'register') 
    ? { justifyContent: 'center' }
    : { justifyContent: 'space-between' }  }}>
  
  {/* Left Side - Drop Menus */}
  <Box sx={{ display: 'flex', gap: 2,

}}>
    <ThemeDropMenu />
    {['learning', 'games', 'chat'].includes(pageToDisplay) && userData && <DropMenu />}
  </Box>

  {/* Right Side - Login/Register/Logout Buttons */}
  <Box sx={{ display: 'flex', gap: 2 }}>
    {(pageToDisplay !== 'login' && pageToDisplay !== 'register') && !userData && (
      <LoginRegisterButton />
    )}
    {userData && <LogoutButton />}
  </Box>

</Box>
{/* End of Header */}
<editTargetContext.Provider value={[editTarget, setEditTarget]}>

{/*end of header */}

            {/* please log in - shoews if trying to access other sights without login */}
            {pageToDisplay !== 'landing' &&
                pageToDisplay !== 'login' &&
                pageToDisplay !== 'register' &&
                !userData && <PleaseLogin />}
                
                {/*//*  Page Rendering */}
                {/* login page */}
                {pageToDisplay === 'login' && <Login />}

                {/* registration gage */}
                {pageToDisplay === 'register' && <Register />}

                {/* home page */}
                {pageToDisplay === 'landing' && <Landing />}

                {/* games and lerning  pages */}
                {(pageToDisplay === 'games' || pageToDisplay === 'learning') &&
                  userData && <Activities />}

                {/* chat page */}
                {pageToDisplay === 'chat' && userData && <Chat />}

                {/* admin and parent portal pages */}
                {(pageToDisplay === 'admin' || pageToDisplay === 'parent') &&
                  userData && <Portal />}

                {/* edit user page */}
                {(pageToDisplay === 'editUser' ||
                  pageToDisplay === 'addUser' ||
                  pageToDisplay === 'editKid' ||
                  pageToDisplay === 'addKid') &&
                  userData && <EditUser />}

                {/* edit chat topic page */}
                {(pageToDisplay === 'editChatTopic' ||
                  pageToDisplay === 'addChatTopic') && <EditChatTopic />}
                {(pageToDisplay === 'editActivity' ||
                  pageToDisplay === 'addGame' ||
                  pageToDisplay === 'addLearning') && <EditActivity />}

                {/* footer */}
                <Footer />
              </editTargetContext.Provider>
            </KidsOfParentContext.Provider>
          </ptdContext.Provider>
        </userDataContext.Provider>
      </ThemeProvider>
    </activeThemeContext.Provider>
  )
}

export default App
