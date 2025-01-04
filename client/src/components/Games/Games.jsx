/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'

//COMPONENT IMPORTS
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'
import DropMenu from '../DropMenu/DropMenu'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/ptd'

const Games = () => {
  return (
    <>
      <h1>GAMES PAGE</h1>
      <DropMenu />
      <Banner />
      <Footer />
    </>
  )
}

export default Games
