import { useState } from 'react';
import './App.css';

// COMPONENT IMPORTS
import Login from './components/login/Login';
import Register from './components/Register/Register';
import Landing from './components/Landing/Landing';
import Activities from './components/Activities/Activities';
import Chat from './components/Chat/Chat';
import DropMenu from './components/DropMenu/DropMenu';

// CONTEXT IMPORTS
import { ptdContext } from './components/zContextHooks/contextHooks';

function App() {
  const [pageToDisplay, setPageToDisplay] = useState('landing');

  return (
    <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
      {/* Global DropMenu */}
      <DropMenu />

      {/* Page Rendering */}
      {pageToDisplay === 'login' && <Login />}
      {pageToDisplay === 'register' && <Register />}
      {pageToDisplay === 'landing' && <Landing />}
      {(pageToDisplay === 'games' || pageToDisplay === 'learning') && <Activities />}
      {pageToDisplay === 'chat' && <Chat />}
    </ptdContext.Provider>
  );
}

export default App;