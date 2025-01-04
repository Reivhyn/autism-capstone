/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import './dropMenu.css'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/ptd'

//HELPER IMPORTS
import { changePage } from '../zzHelpers/helpers'

const DropMenu = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)

  return (
    <div className="dropMenu">
      <div>Site Navigation</div>
      <div className="dropContent">
        {/* button to go home */}
        <div
          className="dropMenuButton"
          onClick={() => changePage(setPageToDisplay, 'landing')}
        >
          {pageToDisplay !== 'landing' ? 'Home' : ''}
        </div>

        {/* button to fo to learning activities */}
        <div
          className="dropMenuButton"
          onClick={() => changePage(setPageToDisplay, 'learning')}
        >
          {pageToDisplay !== 'learning' ? 'Learning Activities' : ''}
        </div>

        {/* button to go to games */}
        <div
          className="dropMenuButton"
          onClick={() => changePage(setPageToDisplay, 'games')}
        >
          {pageToDisplay !== 'games' ? 'Games' : ''}
        </div>

        {/* button to go to chat */}
        <div
          className="dropMenuButton"
          onClick={() => changePage(setPageToDisplay, 'chat')}
        >
          {pageToDisplay !== 'chat' ? 'Chat' : ''}
        </div>
      </div>
    </div>
  )
}

export default DropMenu
