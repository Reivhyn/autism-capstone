/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react'

// FETCH IMPORTS
import { getAllChatTopics } from '../zzzFetches/fetches'
import { userDataContext } from '../zContextHooks/contextHooks'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/contextHooks'

// MUI IMPORTS
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'

const ChatTopicDropMenu = ({ currentTopic, setCurrentTopic }) => {
  //* USESTATE
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [allowedTopics, setAllowedTopics] = useState('')
  const [displayList, setdisplayList] = useState('')
  const [anchorEl, setAnchorEl] = React.useState('')
  const open = Boolean(anchorEl)

  //* FUNCTIONS
  //get all topics then get allowed topics
  const getTopics = async () => {
    const arr = []
    const allTopics = await getAllChatTopics()
    allTopics.allChatTopics.forEach((topic) => {
      if (userData.chatAccess.includes(topic._id)) {
        arr.push(topic)
      }
    })
    setAllowedTopics(arr)
  }

  // handle open for menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  //handle close for menu
  const handleClose = () => {
    setAnchorEl(null)
  }

  //render drop menu items
  const renderList = () => {
    setdisplayList(
      allowedTopics.map((topic) => {
        return (
          <MenuItem
            className="chatTopicItem"
            key={topic._id}
            onClick={() => {
              setCurrentTopic(topic)
              handleClose()
            }}
          >
            {topic.topicTitle}
          </MenuItem>
        )
      })
    )
  }

  //* USEEFFECT
  //get topics on component load
  useEffect(() => {
    if (pageToDisplay === 'chat') {
      getTopics()
    }
  }, [pageToDisplay])

  //render list
  useEffect(() => {
    if (allowedTopics) {
      renderList()
    }
  }, [allowedTopics])

  //* RENDER
  return (
    <div>
      <Button
        variant="outlined"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        startIcon={<MenuIcon />}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {currentTopic ? currentTopic.topicTitle : 'Choose A Topic'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          sx: {
            maxHeight: '50vh',
            overflowY: 'auto', // Ensure scrolling works
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            '&::-webkit-scrollbar': {
              display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
            },
          },
        }}
      >
        {displayList ? displayList : 'No topics available.'}
      </Menu>
    </div>
  )
}
export default ChatTopicDropMenu
