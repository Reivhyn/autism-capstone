/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './games.css'

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
import {runSearch} from '../zzHelpers/helpers'

// FETCH IMPORTS
import { getActivities } from '../zzzFetches/fetches'

const Games = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [displayResult, setDisplayResult] = useState('')

  //object to hold list of games
  const [allGames, setAllGames] = useState('')

  //* FUNCTIONS
  // fetches available activities for the user
  const fetchActivities = async () => {
    setAllGames(await getActivities('6775ffb83fecb4f3f4b6e22e')) //TODO REMOVE HARD CODE
  }

  // handles logic for rendering activities for the user
  const displayGames = (gamesArray) => {
    return gamesArray.map((game, i) => {
      return <ActivityTile key={`game${i}`} tileData={game} />
    })
  }

  //* USEEFFECT
  // fetches avilable games from server when page is displayed
  useEffect(() => {
    if (pageToDisplay === 'games') {
      fetchActivities()
    }
  }, [pageToDisplay])

  // displays allowed games for user from fetch
  useEffect(() => {
    if(pageToDisplay === 'games' && allGames){
      if(!displayResult){
        console.log('allGames.allowedGames', allGames.allowedGames)
        setDisplayResult(displayGames(allGames.allowedGames))
        return
      }
    }
  },[allGames, searchTerm])

  useEffect(() => {
    if(pageToDisplay === 'games' && allGames){

  setDisplayResult(runSearch(allGames.allowedGames, 'puzzle'))
    }
  },[searchTerm])

  //!! <<<<DEBUG>>>>
  useEffect(() => {
    if (pageToDisplay === 'games') {
      // console.log('allGames', allGames)
    }
  }, [displayResult])
  //!! <<<<END DEBUG>>>>

  //* RENDER
  return (
    <>
      <h1>GAMES PAGE</h1>
      <DropMenu />
      <Banner />

      <SearchBar setSearchTerm={setSearchTerm}/>
      
      {/* grid for games */}
      <div className="activityGridWrap">
        <div className="activityTiles gridContainer">
          {displayResult ? displayResult : 'Loading Games'}
        </div>
      </div>


      <Footer />
    </>
  )
}

export default Games
