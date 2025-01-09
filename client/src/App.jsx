import { useState } from 'react';
import './App.css';

// COMPONENT IMPORTS
import Login from './components/login/Login';
import Register from './components/Register/Register';
import Landing from './components/Landing/Landing';
import Activities from './components/Activities/Activities';
import Chat from './components/Chat/Chat';
import Portal from './components/Portal/Portal';
import DropMenu from './components/DropMenu/DropMenu';

// CONTEXT IMPORTS
import { ptdContext, userDataContext } from './components/zContextHooks/contextHooks';

function App() {
  // State for page to display
  const [pageToDisplay, setPageToDisplay] = useState('landing');
  // State for user data
  const [userData, setUserData] = useState('');

  return (
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
      </ptdContext.Provider>
    </userDataContext.Provider>
  );
}

export default App;