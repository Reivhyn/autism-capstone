/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import './portalList.css'

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
  const setUpList = () => {
    if (listType === 'user') {
      setDisplayList(
        itemsToList.allUsers.map((item) => (
          <div
            key={item._id}
            className="portalListItem"
            onClick={() => {
              setEditTarget(item)
              item.userType === 'kid'
                ? setPageToDisplay('editKid')
                : setPageToDisplay('editUser')
            }}
          >
            {`${item.firstName} ${item.lastName} (${item.userName})`}
          </div>
        ))
      )
    } else if (listType === 'kids') {
      setDisplayList(
        itemsToList.foundKidsOfParent.map((item) => (
          <div
            key={item._id}
            className="portalListItem"
            onClick={() => {
              setEditTarget(item)
              setPageToDisplay('editKid')
            }}
          >
            {`${item.firstName} ${item.lastName} (${item.userName})`}
          </div>
        ))
      )
    } else if (listType === 'games') {
      setDisplayList(
        itemsToList.allGames.map((item) => (
          <div
            key={item._id}
            className="portalListItem"
            onClick={() => {
              setEditTarget(item)
              setPageToDisplay('editActivity')
            }}
          >
            {item.activityTitle}
          </div>
        ))
      )
    } else if (listType === 'learning') {
      setDisplayList(
        itemsToList.allLearning.map((item, i) => (
          <div
            key={`item${i}`}
            className="portalListItem"
            onClick={() => {
              setEditTarget(item)
              setPageToDisplay('editActivity')
            }}
          >
            {item.activityTitle}
          </div>
        ))
      )
    } else if (listType === 'chatTopics') {
      setDisplayList(
        itemsToList.allChatTopics.map((item) => (
          <div
            key={item._id}
            className="portalListItem"
            onClick={() => {
              setEditTarget(item)
              setPageToDisplay('editChatTopic')
            }}
          >
            {item.topicTitle}
          </div>
        ))
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
          height: '49vh', // Shorter height
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
          sx={{ display: 'sticky',  marginBottom: "1vh"}}
          onClick={handleAddClick}
        >
          Add
        </Button>
      )}
    </Box>
  )
}

export default PortalList
