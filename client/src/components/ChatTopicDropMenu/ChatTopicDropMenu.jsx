/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react'
import { Box, Typography, Paper } from '@mui/material' // Use MUI components
import { useTheme } from '@mui/material/styles'
import './chatTopicDropMenu.css'

// FETCH IMPORTS
import { getAllChatTopics } from '../zzzFetches/fetches'
import { userDataContext, ptdContext } from '../zContextHooks/contextHooks'

const ChatTopicDropMenu = ({ currentTopic, setCurrentTopic }) => {
  //* USESTATE
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [allowedTopics, setAllowedTopics] = useState([])
  const [displayList, setDisplayList] = useState([])

  //* GET CURRENT THEME
  const theme = useTheme()

  //* FUNCTIONS
  const getTopics = async () => {
    const allTopics = await getAllChatTopics()
    const filteredTopics = allTopics.allChatTopics.filter(topic => 
      userData.chatAccess.includes(topic._id)
    )
    setAllowedTopics(filteredTopics)
  }

  const renderList = () => {
    setDisplayList(
      allowedTopics.map((topic) => (
        <Paper
          key={topic._id}
          onClick={() => setCurrentTopic(topic)}
          sx={{
            padding: 1,
            marginBottom: 1,
            cursor: 'pointer',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
            },
          }}
        >
          {topic.topicTitle}
        </Paper>
      ))
    )
  }

  //* USEEFFECT
  useEffect(() => {
    if (pageToDisplay === 'chat') {
      getTopics()
    }
  }, [pageToDisplay])

  useEffect(() => {
    if (allowedTopics.length > 0) {
      renderList()
    }
  }, [allowedTopics])

  //* RENDER
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {currentTopic ? currentTopic.topicTitle : 'Choose A Topic'}
      </Typography>
      <Box>{displayList}</Box>
    </Box>
  )
}

export default ChatTopicDropMenu
