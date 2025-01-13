/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './activities.css'

//COMPONENT IMPORTS
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'
import DropMenu from '../DropMenu/DropMenu'
import ActivityTile from '../ActivityTile/ActivityTile'
import SearchBar from '../SearchBar/SearchBar'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/contextHooks'

//HELPER IMPORTS
import { runSearch } from '../zzHelpers/helpers'

// FETCH IMPORTS
import { getActivities } from '../zzzFetches/fetches'

const Activities = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [displayResult, setDisplayResult] = useState('')
  const [lastPage, setLastPage] = useState('')

  //object to hold list of games
  const [allActivities, setAllActivities] = useState('')

  //* FUNCTIONS
  // fetches available activities for the user
  const fetchActivities = async () => {
    setAllActivities(await getActivities('6775ffb83fecb4f3f4b6e22e')) //TODO REMOVE HARD CODE
  }

  // handles logic for rendering activities for the user
  const displayGames = (activityArray) => {
    return activityArray.map((activity, i) => {
      return <ActivityTile key={`game${i}`} tileData={activity} />
    })
  }

  //* USEEFFECT
  // fetches avilable games from server when page is displayed
  useEffect(() => {
    if (pageToDisplay === 'games' || pageToDisplay === 'learning') {
      fetchActivities()
    }
  }, [pageToDisplay])

  // displays allowed games if pageToDisplay is set to games
  useEffect(() => {
    if (pageToDisplay === 'games' && allActivities) {
      setLastPage('games')

      setDisplayResult(displayGames(allActivities.allowedGames))
      return
    }
  }, [allActivities])

  // displays allowed learning activities if pageToDisplay is set to learning
  useEffect(() => {
    if (pageToDisplay === 'learning' && allActivities) {
      setDisplayResult(displayGames(allActivities.allowedLearning))
    }
  }, [allActivities])

  // logic to run the search
  useEffect(() => {
    //logig to run search on games
    if (pageToDisplay === 'games' && allActivities) {
      if (pageToDisplay === 'games') {
        const searchResults = runSearch(allActivities.allowedGames, searchTerm)
        setDisplayResult(displayGames(searchResults))
      }

      // logic to run search on learning activities
      if (pageToDisplay === 'learning') {
        const searchResults = runSearch(
          allActivities.allowedLearning,
          searchTerm
        )
        setDisplayResult(displayGames(searchResults))
      }
    }
  }, [searchTerm])

  //* RENDER
  return (
    <>
      <h1>
        {pageToDisplay ? `${pageToDisplay.toUpperCase()} PAGE` : 'Loading'}
      </h1>
        <div className='banner-container'>
          <Banner />
        </div>
      <div className='dropsearch-container'>
        <DropMenu />
          <div className='searchbar-container'>
            <SearchBar setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {/* grid for games */}
      <div className="activityGridWrap">
        <div className="activityTiles gridContainer">
          {displayResult ? displayResult : 'Loading Activities'}
        </div>
      </div>

      <div className='footer-container'>
        <Footer />
      </div> 
    </>
  )
}

export default Activities
