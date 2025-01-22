/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import './dualList.css'

//CONTEXT IMPORTS
// pdt -> page to display
import {
  ptdContext,
  editTargetContext,
} from '../zContextHooks/contextHooks'

const DualList = ({
  dataToList,
  listType,
  setGamesAccess,
  setLearningAccess,
  setChatAccess,
}) => {
  //* USESTATES
  const [editTarget, setEditTarget] = useContext(editTargetContext)
  const [dualListTitle, setDualListTitle] = useState('')

  //set vars for available and selected options
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [availableOptions, setAvailableOptions] = useState('')
  const [selectedOptions, setSelectedOptions] = useState('')
  const [renderAvailable, setRenderAvailable] = useState('')
  const [renderSelected, setRenderSelected] = useState('')

  //* FUNCTIONS
  //function to initilise dual list
  const initilizeDualList = () => {
    if (listType === 'games') {
      //if adding a new user do not check for exiting user selctions
      if (pageToDisplay === 'addKid') {
        setAvailableOptions(dataToList.allGames)
        setSelectedOptions([])
        return
      }

      //initilize available games
      const array = [] //throw away array to use
      dataToList.allGames.map((option) => {
        if (!editTarget.activitiesAccess.includes(option._id)) {
          array.push(option)
        }
      })
      setAvailableOptions(array)

      //initialize selected games
      const arr = []
      dataToList.allGames.map((option) => {
        if (editTarget.activitiesAccess.includes(option._id)) {
          arr.push(option)
        }
        setSelectedOptions(arr)
      })
    }

    if (listType === 'learning') {
      //if adding a new user do not check for exiting user selctions
      if (pageToDisplay === 'addKid') {
        setAvailableOptions(dataToList.allLearning)
        setSelectedOptions([])
        return
      }

      //initilize available learning activities
      const array = [] //throw away array to use
      dataToList.allLearning.map((option) => {
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

    if (listType === 'chatTopics') {
      //if adding a new user do not check for exiting user selctions
      if (pageToDisplay === 'addKid') {
        setAvailableOptions(dataToList.allChatTopics)
        setSelectedOptions([])
        return
      }

      //initilize available learning activities
      const array = [] //throw away array to use
      dataToList.allChatTopics.map((option) => {
        if (!editTarget.chatAccess.includes(option._id)) {
          array.push(option)
        }
      })
      setAvailableOptions(array)

      //initialize selected learning activities
      const arr = []
      dataToList.allChatTopics.map((option) => {
        if (editTarget.chatAccess.includes(option._id)) {
          arr.push(option)
        }
        setSelectedOptions(arr)
      })
    }
  }

  //render the list
  const renderList = () => {
    //render activities list
    if (listType === 'games' || listType === 'learning') {
      //render available list
      setRenderAvailable(
        availableOptions.map((option) => {
          return (
            <li
              onClick={() => handleAdd(option)}
              key={
                listType === 'games'
                  ? `availabelGame${option._id}`
                  : `availableLearning${option._id}`
              }
            >
              {option.activityTitle}
            </li>
          )
        })
      )

      //render selected list
      setRenderSelected(
        selectedOptions.map((option) => {
          return (
            <li
              onClick={() => handleRemove(option)}
              key={
                listType === 'games'
                  ? `selectedGame${option._id}`
                  : `selectedLearning${option._id}`
              }
            >
              {option.activityTitle}
            </li>
          )
        })
      )
    }

    //render chat topics list
    if (listType === 'chatTopics') {
      //render available list
      setRenderAvailable(
        availableOptions.map((option) => {
          return (
            <li
              onClick={() => handleAdd(option)}
              key={`availabelTopics${option._id}`}
            >
              {option.topicTitle}
            </li>
          )
        })
      )

      //render selected list
      setRenderSelected(
        selectedOptions.map((option) => {
          return (
            <li
              onClick={() => handleRemove(option)}
              key={`selectedTopics${option._id}`}
            >
              {option.topicTitle}
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
    if (listType === 'chatTopics') {
      setDualListTitle('Chat Topics')
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
    selectedOptions.map((option) => arr.push(option._id))

    if (listType === 'games') setGamesAccess(arr)

    if (listType === 'learning') setLearningAccess(arr)

    if (listType === 'chatTopics') setChatAccess(arr)
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
