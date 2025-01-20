import { useState } from 'react';
import './App.css';

// COMPONENT IMPORTS
import Login from './components/login/Login';
import Register from './components/Register/Register';
import Landing from './components/Landing/Landing';
import Activities from './components/Activities/Activities';
import Chat from './components/Chat/Chat';
import Portal from './components/Portal/Portal';
import EditUser from './components/EditUser/EditUser';
import DropMenu from './components/DropMenu/dropMenu.jsx';// Import DropMenu

// CONTEXT IMPORTS
import {
  ptdContext,
  userDataContext,
  editTargetContext,
  KidsOfParentContext,
} from './components/zContextHooks/contextHooks';

// MATERIAL-UI IMPORTS
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import darkTheme from './Theme/theme.jsx';

function App() {
  const [pageToDisplay, setPageToDisplay] = useState('landing');
  const [userData, setUserData] = useState('');

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <userDataContext.Provider value={[userData, setUserData]}>
        <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
          <editTargetContext.Provider value={{}}>
            <KidsOfParentContext.Provider value={{}}>
              {/* Conditionally Render DropMenu */}
              {(['learning', 'games', 'chat'].includes(pageToDisplay)) && <DropMenu />}

              {/* Page Rendering */}
              {pageToDisplay === 'login' && <Login />}
              {pageToDisplay === 'register' && <Register />}
              {pageToDisplay === 'landing' && <Landing />}
              {pageToDisplay === 'home' && <Landing />}
              {(pageToDisplay === 'games' || pageToDisplay === 'learning') && <Activities />}
              {pageToDisplay === 'chat' && <Chat />}
              {(pageToDisplay === 'admin' || pageToDisplay === 'parent') && <Portal />}
              {(pageToDisplay === 'editUser' || pageToDisplay === 'addUser' || pageToDisplay === 'editKid' || pageToDisplay === 'addKid') && <EditUser />}
            </KidsOfParentContext.Provider>
          </editTargetContext.Provider>
        </ptdContext.Provider>
      </userDataContext.Provider>
    </ThemeProvider>
  );
}

export default App;