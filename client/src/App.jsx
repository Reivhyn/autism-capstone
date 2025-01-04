// eslint-disable-next-line no-unused-vars
import { useState, useContext, useEffect } from 'react'
import './App.css'

//COMPONENT IMPORTS
import Landing from './components/Landing/Landing'
import Learning from './components/Learning/Learning'
import Games from './components/Games/Games'
import Chat from './components/Chat/Chat'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext, activityContext } from './components/zContextHooks/contextHooks'

function App() {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useState('landing')

  //* HOOKS

  //* FUNCTIONS

  //* PAGE RENDER
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
  if (pageToDisplay === 'learning') {
    return (
      <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
        <Learning />
      </ptdContext.Provider>
    )
  }

  //diplay games page
  if (pageToDisplay === 'games') {
    return (
      <ptdContext.Provider value={[pageToDisplay, setPageToDisplay]}>
        <Games />
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
