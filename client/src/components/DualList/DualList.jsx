/* eslint-disable react/prop-types */
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

const DualList = ({
  dataToList,
  listType,
  gamesAccess,
  setGamesAccess,
  learningAccess,
  setLearningAccess,
}) => {
  //* USESTATES
  const [editTarget, setEditTarget] = useContext(editTargetContext)
  const [dualListTitle, setDualListTitle] = useState('')

  //set vars for available and selected options
  const [availableOptions, setAvailableOptions] = useState('')
  const [selectedOptions, setSelectedOptions] = useState('')
  const [renderAvailable, setRenderAvailable] = useState('')
  const [renderSelected, setRenderSelected] = useState('')

  //* FUNCTIONS
  //function to initilise dual list
  const initilizeDualList = () => {
    if (listType === 'games') {
      //initilize available games
      const array = [] //throw away array to use 
      dataToList.allGames.map(option => {
        if (!editTarget.activitiesAccess.includes(option._id)) {
          array.push(option)
        }
      })
      setAvailableOptions(array)

      //initialize selected games
      const arr = []
      dataToList.allGames.map((option) => {
        if (editTarget.activitiesAccess.includes(option._id)) {//! sometimes crash here
          arr.push(option)
        }
        setSelectedOptions(arr)
      })
    }

    if (listType === 'learning') {
      //initilize available learning activities
      const array = [] //throw away array to use 
      dataToList.allLearning.map(option => {
        if (!editTarget.activitiesAccess.includes(option._id)) {
          array.push(option)
        }
      })
      setAvailableOptions(array)

      //initialize selected learning activities
      const arr = []
      dataToList.allLearning.map((option) => {
        if (editTarget.activitiesAccess.includes(option._id)) {
          arr.push(option)
        }
        setSelectedOptions(arr)
      })
    }
  }

  //render the list
  const renderList = () => {
    if (listType === 'games' || listType === 'learning') {
      //render available list
      setRenderAvailable(
        availableOptions.map((option, i) => {
          return (
            <li
              onClick={() => handleAdd(option)}
              key={
                listType === 'games'
                  ? `availabelGame${i}`
                  : `availableLearning${i}`
              }
            >
              {option.activityTitle}
            </li>
          )
        })
      )

      //render selected list
      setRenderSelected(
        selectedOptions.map((option, i) => {
          return (
            <li
              onClick={() => handleRemove(option)}
              key={
                listType === 'games'
                  ? `selectedGame${i}`
                  : `selectedLearning${i}`
              }
            >
              {option.activityTitle}
            </li>
          )
        })
      )
    }
  }

  // sets title of the dual list
  const setTitle = () => {
    if (listType === 'games') {
      setDualListTitle('Games')
      return
    }
    if (listType === 'learning') {
      setDualListTitle('Learning Activities')
      return
    }
  }

  // handle adding item to selected
  const handleAdd = (option) => {
    setAvailableOptions(availableOptions.filter((item) => option !== item))
    setSelectedOptions([...selectedOptions, option])
  }

  //handle removing item from selected
  const handleRemove = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => option !== item))
    setAvailableOptions([...availableOptions, option])
  }

  // add all options to selected list
  const handleAddAll = () => {
    setSelectedOptions([...selectedOptions, ...availableOptions])
    setAvailableOptions([])
  }

  //remove all options from selcted list
  const handleRemoveAll = () => {
    setAvailableOptions([...availableOptions, ...selectedOptions])
    setSelectedOptions([])
  }

  //update access list returned to edit user
  const updateAccessList = () => {
      const arr = []
      selectedOptions.map(option => arr.push(option._id))
      
      if (listType === 'games') setGamesAccess(arr)

      if(listType === 'learning') setLearningAccess(arr)
    
  }

  //* USEEFFECT
  //initilize list
  useEffect(() => {
    setTitle()
    initilizeDualList()
  }, [])

  //render list after initilization and update access list returned tp edit user
  useEffect(() => {
    if (availableOptions && selectedOptions) {
      renderList()

      updateAccessList()
    }
  }, [availableOptions, selectedOptions])

  return (
    <>
      {/* edit access games the user has access to */}
      <div className="dualListOuterWrap">
        {/* dual listbox title */}
        <div className="dualListTitle">{dualListTitle}</div>

        {/* wraps left and right side of list */}
        <div className="dualListWrapper">
          {/* available side of dual list */}
          <div className="availableWraper">
            <div className="available">Available</div>
            <ul>{renderAvailable ? renderAvailable : 'Fetching data'}</ul>
            <button onClick={() => handleAddAll()}>Add All</button>
          </div>

          {/* selected side of dual list */}
          <div className="selectedWraper">
            <div className="selected">Selected</div>
            <ul>{renderSelected ? renderSelected : 'Fetching data'}</ul>
            <button onClick={() => handleRemoveAll()}>Remove All</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DualList
