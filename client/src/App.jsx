// eslint-disable-next-line no-unused-vars
import { useState, useContext, useEffect } from 'react'
import './App.css'

//COMPONENT IMPORTS
import Login from './components/login/Login'
import Register from './components/Register/Register'
import Landing from './components/Landing/Landing'
import Activities from './components/Activities/Activities'
import Chat from './components/Chat/Chat'
import Portal from './components/Portal/Portal'

//CONTEXT IMPORTS
// pdt -> page to display
import {
  ptdContext,
  userDataContext,
} from './components/zContextHooks/contextHooks'

function App() {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useState('landing')

  const [userData, setUserData] = useState('')
  //* HOOKS

  //* FUNCTIONS

  //* PAGE RENDER

  //dispay login gage
  if (pageToDisplay === 'login') {
    return (
      <>
        <userDataContext.Provider value={[userData, setUserData]}>
          <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
            <Login />
          </ptdContext.Provider>
        </userDataContext.Provider>
      </>
    )
  }

  //dispay register page
  if (pageToDisplay === 'register') {
    return (
      <>
        <userDataContext.Provider>
          <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
            <Register />
          </ptdContext.Provider>
        </userDataContext.Provider>
      </>
    )
  }

  //display langing page
  if (pageToDisplay === 'landing') {
    return (
      <>
        <userDataContext.Provider value={userData}>
          <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
            <Landing />
          </ptdContext.Provider>
        </userDataContext.Provider>
      </>
    )
  }

  //diplay learning page
  if (pageToDisplay === 'games' || pageToDisplay === 'learning') {
    return (
      <>
        <userDataContext.Provider value={userData}>
          <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
            <Activities />
          </ptdContext.Provider>
        </userDataContext.Provider>
      </>
    )
  }

  //display chat page
  if (pageToDisplay === 'chat') {
    return (
      <userDataContext.Provider value={userData}>
        <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
          <Chat />
        </ptdContext.Provider>
      </userDataContext.Provider>
    )
  }

  //display admin or parent portal
  if (pageToDisplay === 'admin' || pageToDisplay === 'parent') {
    return (
      <userDataContext.Provider value={userData}>
        <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
          <Portal />
        </ptdContext.Provider>
      </userDataContext.Provider>
    )
  }
}

export default App
