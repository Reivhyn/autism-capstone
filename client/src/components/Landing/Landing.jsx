/*
 * this component displays the landing page
 */

/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import './landing.css';

//COMPONENT IMPORTS
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/contextHooks'

//HELPER IMPORTS
import { changePage } from '../zzHelpers/helpers'

const Landing = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)

  //* FUNCTIONS


  //* RENDER
  return (
    <>
      <button className="loginButton" onClick={() => changePage(setPageToDisplay, 'login')} >Login</button>
      <button className="loginButton" onClick={() => changePage(setPageToDisplay, 'register')} >Register</button>

      <h1 className="siteNameHeader">SITE NAME TBD</h1>

      <Banner />

      <div className="mainPageButtons">
        {/* learning activities button with logig for when button is clicked */}
        <div className="frontPageSectionButton">
          <button
            className="landingButtonText"
            onClick={() => changePage(setPageToDisplay, 'learning')}
          >
            Learning Activities
          </button>
        </div>

        {/* games button with logig for when button is clicked */}
        <div className="frontPageSectionButton">
          <button
            className="landingButtonText"
            onClick={() => changePage(setPageToDisplay, 'games')}
          >
            Games
          </button>
        </div>

        {/* chat button with logig for when button is clicked */}
        <div className="frontPageSectionButton">
          <button
            className="landingButtonText"
            onClick={() => changePage(setPageToDisplay, 'chat')}
          >
            Chat
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Landing
