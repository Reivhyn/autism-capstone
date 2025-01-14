import React, { useContext, useEffect, useState } from 'react'
import './dualList.css'

//CONTEXT IMPORTS
// pdt -> page to display
import {
  ptdContext,
  userDataContext,
  KidsOfParentContext,
  editTargetContext,
} from '../zContextHooks/contextHooks'

const DualList = ({dataToList, listType}) => {
  //* USESTATES
  const [editTarget, setEditTarget] = useContext(editTargetContext)

  //set vars for available and selected options
  const [avilableOptions, setAvailableOptions] = useState('')
  const [selectedOptions, setSelectedOptions] = useState('')

  //* FUNCTIONS
  //function to initilise dual list
  const initilizeAvailableActivities = () => {
    //initilize games
    if (listType === 'games') {
      setAvailableOptions(
        dataToList.allGames.map((game, i) => {
          return <li key={`availabelGame${i}`}>{game.activityTitle}</li>
        })
      )

      setSelectedOptions(
        dataToList.allGames.map((game, i) => {
          if (editTarget.activitiesAccess.includes(game._id))
            return <li key={`selectedGame${i}`}>{game.activityTitle}</li>
        })
      )
    }

    //initilize learning
    if (listType === 'learning') {
      setAvailableOptions(
        dataToList.allLearning.map((learning, i) => {
          return <li key={`availabellearning${i}`}>{learning.activityTitle}</li>
        })
      )

      setSelectedOptions(
        dataToList.allLearning.map((learning, i) => {
          if (editTarget.activitiesAccess.includes(learning._id))
            return (
              <li key={`selectedLearning${i}`}>{learning.activityTitle}</li>
            )
        })
      )
    }
  }

  //* USEEFFECT

    //initilize available activites after data retrived
    useEffect(() => {
      if (dataToList) {
        console.log('listType', listType)
        console.log('dataToList', dataToList)
        initilizeAvailableActivities()
      }
    }, [dataToList])
  
  return (
    <>
    DUALLIST COMPONENT
      {/* edit access games the user has access to */}
      <div className="dualListOuterWrap">
        {/* dual listbox title */}
        <div className="dualListTitle">Games</div>

        {/* wraps left and right side of list */}
        <div className="dualListWrapper">
          {/* available side of dual list */}
          <div className="availableWraper">
            <div className="available">Available</div>
            <ul>{avilableOptions ? avilableOptions : 'Fetching data'}</ul>
          </div>

          {/* selected side of dual list */}
          <div className="selectedWraper">
            <div className="selected">Selected</div>
            <ul>{selectedOptions ? selectedOptions : 'Fetching data'}</ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default DualList