/*
 * this component contains the banner displayed on each page
 */

/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/contextHooks.jsx'



const Banner = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)

  //* FUNCTIONS
  const bannerText = () => {
    if (pageToDisplay === 'landing') {
      return 'Lets Have Some Fun!!!'
    }
    if (pageToDisplay === 'learning') {
      return 'Welcome to the Learning Page! Select an activity'
    }
    if (pageToDisplay === 'games') {
      return 'Welcome to the games page! Select a game'
    }
    if (pageToDisplay === 'chat') {
      return 'Say hi to our chat bot'
    }
    return 'Welcome to our site'
  }


  //* RENDER
  return <h2 className="banner">{pageToDisplay ? bannerText() : 'Let'}</h2>
}

export default Banner
