import { useState } from 'react';
import './App.css';

<<<<<<< HEAD
//COMPONENT IMPORTS
import Login from './components/login/Login'
import Register from './components/Register/Register'
import Landing from './components/Landing/Landing'
import Activities from './components/Activities/Activities'
import Chat from './components/Chat/Chat'
import Portal from './components/Portal/Portal'
import LogoutButton from './components/LogoutButton/LogoutButton'

//CONTEXT IMPORTS
// pdt -> page to display
import {
  ptdContext,
  userDataContext,
} from './components/zContextHooks/contextHooks'
=======
// COMPONENT IMPORTS
import Login from './components/login/Login';
import Register from './components/Register/Register';
import Landing from './components/Landing/Landing';
import Activities from './components/Activities/Activities';
import Chat from './components/Chat/Chat';
import Portal from './components/Portal/Portal';
import DropMenu from './components/DropMenu/DropMenu';
import ParentHome from './components/Parent Home/parentHome';

// CONTEXT IMPORTS
import { ptdContext, userDataContext } from './components/zContextHooks/contextHooks';

// MATERIAL-UI IMPORTS
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import darkTheme from './Theme/theme.jsx';
>>>>>>> develop

function App() {
  // State for page to display
  const [pageToDisplay, setPageToDisplay] = useState('landing');
  // State for user data
  const [userData, setUserData] = useState('');

<<<<<<< HEAD
  const [userData, setUserData] = useState('')
  //* HOOKS

  //* FUNCTIONS
  // controls logic for which page is rendered
  const renderPage = () => {
    switch (pageToDisplay) {
      case 'login':
        return <Login />
      case 'register':
        return <Register />
      case 'landing':
        return <Landing />
      case 'games':
      case 'learning':
        return <Activities />
      case 'chat':
        return <Chat />
      case 'admin':
      case 'parent':
        return <Portal />
      default:
        return <Landing /> // Fallback to a default page
    }
  }

  //* USEEFFECT
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


  //* RENDER
  return (
      <userDataContext.Provider value={[userData, setUserData]}>
        <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
          {userData ? <LogoutButton /> : ''}
          {renderPage()}
        </ptdContext.Provider>
      </userDataContext.Provider>
  )
=======
  return (
    <ThemeProvider theme={darkTheme}> {/* Wrap everything inside ThemeProvider */}
      <CssBaseline /> {/* To ensure consistent styling across all browsers */}
      <userDataContext.Provider value={[userData, setUserData]}>
        <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
          {/* Global DropMenu */}
          <DropMenu />

          {/* Page Rendering */}
          {pageToDisplay === 'login' && <Login />}
          {pageToDisplay === 'register' && <Register />}
          {pageToDisplay === 'landing' && <Landing />}
          {(pageToDisplay === 'games' || pageToDisplay === 'learning') && <Activities />}
          {pageToDisplay === 'chat' && <Chat />}
          {(pageToDisplay === 'admin' || pageToDisplay === 'parent') && <Portal />}
          {pageToDisplay === 'parent' && <ParentHome />}
        </ptdContext.Provider>
      </userDataContext.Provider>
    </ThemeProvider>
  );
>>>>>>> develop
}

export default App;