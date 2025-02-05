/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import './dualList.css'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext, editTargetContext } from '../zContextHooks/contextHooks'
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material'

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
  const theme = useTheme()

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

  //* RENDER
  return (
    <>
      {/* only show dual list if editing or adding kid */}
      <div
        style={{
          borderRadius: 4,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: `0px 4px 6px ${theme.palette.primary.main}`,
        }}
      >
        {/* dual list title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}
        >
          {dualListTitle}
        </Typography>

        {/* dual list title wrap */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-evenly' }}>
          {/* available list */}
          <Typography variant="subttile1" sx={{ fontWeight: 'bold' }}>
            Available
          </Typography>
          <Typography variant="subttile1" sx={{ fontWeight: 'bold' }}>
            Selected
          </Typography>
          {/* selected list */}
        </Box>

        {/* dual list left right wrap */}
        <Box sx={{ p: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              p: 2,
              width: '10vw',
              height: '30vh',
              overflow: 'auto',
              scrollbarWidth: 'none', // Hide scrollbar for Firefox
              '&::-webkit-scrollbar': {
                display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
              },
              '@media (max-width: 320px)': {
                flexDirection: 'column', // Adjust width for small devices
              },
            }}
          >
            {/* Available list */}
            <Box sx={{ width: '45%' }}>
              <List>{renderAvailable.length > 0 ? renderAvailable : ''}</List>
            </Box>

            {/* Selected List */}
            <Box sx={{ width: '45%' }}>
              <List>{renderSelected.length > 0 ? renderSelected : ''}</List>
            </Box>
          </Box>
        </Box>

        {/* dual list add and remove button wrap */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'space-evenly',
            padding: '1vh',
          }}
        >
          {/* add all button */}
          <Button variant="outlined" color="primary" onClick={handleAddAll}>
            Add All
          </Button>

          {/* remove all button */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleRemoveAll}
          >
            Remove All
          </Button>
        </Box>
      </div>
    </>
  )
}

export default DualList
