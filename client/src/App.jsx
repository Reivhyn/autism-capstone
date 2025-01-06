// eslint-disable-next-line no-unused-vars
import { useState, useContext, useEffect } from 'react'
import './App.css'

//COMPONENT IMPORTS
import Login from './components/login/Login'
import Register from './components/Register/Register'
import Landing from './components/Landing/Landing'
import Activities from './components/Activities/Activities'
import Chat from './components/Chat/Chat'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from './components/zContextHooks/contextHooks'

function App() {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useState('landing')

  //* HOOKS

  //* FUNCTIONS

  //* PAGE RENDER


  //dispay login gage
  if (pageToDisplay === 'login') {
    return (
      <>
        <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
          <Login />
        </ptdContext.Provider>
      </>
    )
  }

  //dispay register page
  if (pageToDisplay === 'register') {
    return (
      <>
        <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
          <Register />
        </ptdContext.Provider>
      </>
    )
  }

  //display langing page
  if (pageToDisplay === 'landing') {
    return (
      <>
        <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
          <Landing />
        </ptdContext.Provider>
      </>
    )
  }

  //diplay learning page
  if (pageToDisplay === 'games' ||pageToDisplay === 'learning') {
    return (
      <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
        <Activities />
      </ptdContext.Provider>
    )
  }

  //display chat page
  if (pageToDisplay === 'chat') {
    return (
      <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
        <Chat />
      </ptdContext.Provider>
    )
  }
}

export default App
