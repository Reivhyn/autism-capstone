/* eslint-disable no-unused-vars */
import React from 'react'

//COMPONENT IMPORTS
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'
import DropMenu from '../DropMenu/DropMenu'
import SearchBar from '../Searchbar/SearchBar'
import ActivityTile from '../ActivityTile/ActivityTile'
 

const Learning = () => {
  return (
    <>
      <body>
        <h1>LEARNING PAGE</h1>
          <div className='dropsearch-container'>
            <DropMenu />
            <SearchBar />
          </div>

          <div className='activity-container'>
            <ActivityTile />
          </div>

          <div className='footer-container'> 
            <Footer />
          </div>
    
      </body>
    </>
  )
}

export default Learning
