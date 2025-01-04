/* eslint-disable react/prop-types */
/*
 * this component displays the tiles users can press for games or learning activities.
 */

/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/contextHooks'

const ActivityTile = ({ tileData }) => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)

  //* RENDER
  return (
    <>
      <div className="activityWrap">
        {/* tile title */}
        <div className="activityTile">{tileData.activityTitle}</div>

        {/* tile image */}
        <img
          src={tileData.imageURL}
          alt={`Image for ${tileData.ActivityTile}`}
        />

        {/* tile description */}
        <div className="acvtivityDescription">{tileData.description}</div>
      </div>
    </>
  )
}

export default ActivityTile
