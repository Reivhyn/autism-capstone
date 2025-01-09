/* eslint-disable no-unused-vars */
import React from 'react'

//COMPONENT IMPORTS
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'

//CONTEXT IMPORTS
// pdt -> page to display
import {ptdContext} from '../zContextHooks/contextHooks'

const Chat = () => {
  return (
    <>
      <h1>CHAT PAGE</h1>
      <Banner />
      <Footer />
    </>
  )
}

export default Chat
