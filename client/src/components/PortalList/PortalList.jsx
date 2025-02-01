/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'


// MUI  IMPORTS
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  IconButton,
  useTheme,
  darken,
} from '@mui/material'

// CONTEXT IMPORTS
import {
  ptdContext,
  editTargetContext,
  userDataContext,
} from '../zContextHooks/contextHooks'

const PortalList = ({ itemsToList, listType }) => {
  //* State and Context
  const theme = useTheme()
  const [listTitle, setListTitle] = useState('')
  const [displayList, setDisplayList] = useState('')
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [editTarget, setEditTarget] = useContext(editTargetContext)
  const [userData] = useContext(userDataContext)

  //* Functions

  //elemnt for each map()
  const element = (item, textObject, newPage) => {
    return (
      <Box
        sx={{
          padding: '0.4vh',
          margin: '1vh',
          borderRadius: 2,
          fontWeight: 'bold',
          cursor: 'pointer',
          transition:
            'background-color 0.3s, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            transform: 'scale(1.05)',
            boxShadow: theme.shadows[4],
          },
        }}
        key={item._id}
        className="portalListItem"
        onClick={() => {
          setEditTarget(item)
          setPageToDisplay(newPage)
        }}
      >
        {textObject}
      </Box>
    )
  }

  const setUpList = () => {
    if (listType === 'user') {
      setDisplayList(
        itemsToList.allUsers.map((item) => (
          <Box
            key={item._id}
            sx={{
              padding: '0.4vh',
              margin: '1vh',
              borderRadius: 2,
              fontWeight: 'bold',
              cursor: 'pointer',
              transition:
                'background-color 0.3s, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                transform: 'scale(1.05)',
                boxShadow: theme.shadows[4],
              },
            }}
            onClick={() => {
              setEditTarget(item)
              item.userType === 'kid'
                ? setPageToDisplay('editKid')
                : setPageToDisplay('editUser')
            }}
          >
            {`${item.firstName} ${item.lastName} (${item.userName})`}
          </Box>
        ))
      )
    } else if (listType === 'kids') {
      setDisplayList(
        itemsToList.foundKidsOfParent.map((item) => element(item, `${item.firstName} ${item.lastName} (${item.userName})`, 'editKid'))
      )
    } else if (listType === 'games') {
      setDisplayList(
        itemsToList.allGames.map((item) => element(item, item.activityTitle, 'editActivity'))
      )
    } else if (listType === 'learning') {
      setDisplayList(
        itemsToList.allLearning.map((item, i) => element(item, item.activityTitle, 'editActivity'))
      )
    } else if (listType === 'chatTopics') {
      setDisplayList(
        itemsToList.allChatTopics.map((item) => element(item, item.topicTitle, 'editChatTopic'))
      )
    }
  }
  /* Titles for List */
  const assignListTitle = () => {
    const titles = {
      user: 'Users',
      kids: 'Children',
      games: 'Games',
      learning: 'Learning Activities',
      chatTopics: 'Chat Topics',
      reporting: 'Reporting',
    }
    setListTitle(titles[listType] || 'List')
  }

  const handleAddClick = () => {
    const addPages = {
      user: 'addUser',
      kids: 'addKid',
      games: 'addGame',
      learning: 'addLearning',
      chatTopics: 'addChatTopic',
    }
    setPageToDisplay(addPages[listType] || '')
  }

  //* Effects
  useEffect(() => {
    setUpList()
    assignListTitle()
  }, [itemsToList, listType]) // Ensure `listType` is included in dependencies

  //* Render
  return (
    <Box className="portalListWrap">
      <Box
        sx={{
          height: '48vh', // Shorter height
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '.5vw',
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
          },
        }}
      >
        {displayList.length > 0 ? displayList : 'No items to display'}
      </Box>
      {listType !== 'reporting' && (
        <Button
          variant="outlined"
          color="primary"
          sx={{ display: 'sticky', marginBottom: '1vh' }}
          onClick={handleAddClick}
        >
          Add
        </Button>
      )}
    </Box>
  )
}

export default PortalList
