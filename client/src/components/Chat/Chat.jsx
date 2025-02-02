/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles' // Import MUI theme hook
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import './chat.css'

// COMPONENT IMPORTS
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'
import SiteTitle from '../SiteTitle/SiteTitle'
import ChatTopicDropMenu from '../ChatTopicDropMenu/ChatTopicDropMenu'

// CONTEXT IMPORTS
import { ptdContext } from '../zContextHooks/contextHooks'

const Chat = () => {
  //* USESTATE
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [prompt, setPrompt] = useState('')
  const [geminiStream, setGeminiStream] = useState('')
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [displayLog, setDisplayLog] = useState([])
  const [currentTopic, setCurrentTopic] = useState('')

  //* FUNCTIONS
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      callGemini(e)
    }
  }

  //* GET CURRENT THEME
  const theme = useTheme()

  //* FETCH FUNCTION
  const callGemini = async (e) => {
    e.preventDefault()
    
    //new temp promt varriable to pass to function so text area can be cleared
    const tempPrompt = prompt

    setPrompt('')

    if (!history) {
      setHistory(tempPrompt)
    }

    setIsLoading(true)
    setGeminiStream('')

    try {
      const res = await fetch(`http://127.0.0.1:4000/chat/gemini`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, history, topic: currentTopic }),
        credentials: 'include',
      })

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let streamedText = ''
      let jsonData = ''

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const decodedChunk = decoder.decode(value, { stream: true })

        const lines = decodedChunk.split('\n')
        lines.forEach((line) => {
          if (line.startsWith('TEXT')) {
            streamedText += line.replace('TEXT: ', '') + '\n'
          }
          if (line.startsWith('JSON')) {
            try {
              jsonData = JSON.parse(line.replace('JSON', '').trim())
            } catch (error) {
              console.log('Error parsing JSON', error)
            }
          }
        })
        setGeminiStream(streamedText)
        setHistory(jsonData)
      }
    } catch (error) {
      console.log('Streaming error', error)
    } finally {
      setIsLoading(false)
    }
  }

  //* RENDER CHAT HISTORY
  useEffect(() => {
    /* do not show most recent message to avoid duplicate gemini response */
    if (history && history.length < 1) {
      setDisplayLog(
        history
          .slice(0, -1)
          .reverse()
          .map((log, i) => (
            <Paper
              key={`log${i}`}
              sx={{
                padding: '10px',
                backgroundColor:
                  i % 2 === 0
                    ? theme.palette.background.paper
                    : theme.palette.primary.main,
                color: theme.palette.text.primary,
                borderRadius: '8px',
                marginBottom: '5px',
              }}
            >
              {log.parts[0].text}
            </Paper>
          ))
      )
      return
    }

    /* do not run logic to remove most recent message when chat history has just begun */
    if (history) {
      setDisplayLog(
        history
          .slice(0, -1)
          .reverse()
          .map((log, i) => (
            <Paper
              key={`log${i}`}
              sx={{
                padding: '10px',
                backgroundColor:
                  i % 2 === 0
                    ? theme.palette.background.paper
                    : theme.palette.primary.main,
                color: theme.palette.text.primary,
                borderRadius: '8px',
                marginBottom: '5px',
              }}
            >
              {log.parts[0].text}
            </Paper>
          ))
      )
      return
    }
  }, [history])

  //* RENDER COMPONENT
  return (
    <>
      <SiteTitle />
      <Typography variant="h4" align="center">
        Chat Page
      </Typography>

      {/*<Banner />*/}
      {/* Chat topic drop menu */}
      <ChatTopicDropMenu
        currentTopic={currentTopic}
        setCurrentTopic={setCurrentTopic}
      />

      {/* Prompt Form */}
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        <TextField
          multiline
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          onKeyDown={(e) => handleKeyDown(e)}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={!currentTopic || !prompt}
                  onClick={callGemini}
                  sx={{
                    color:
                      !currentTopic || !prompt
                        ? theme.palette.action.disabled // Lighter color when disabled
                        : theme.palette.primary.main, // Normal color when enabled
                  }}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Chat History */}
      {history.length !== 0 ? (
        <>
          <Box
            className="chatHistoryWrapper"
            sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 3 }}
          >
            {/* Gemini incoming responce stream */}
            <Box
              sx={{
                padding: '10px',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: '8px',
                marginBottom: '5px',
              }}
            >
              {geminiStream}
            </Box>

            {/* past chat log */}
            <Box className="history">{displayLog}</Box>
          </Box>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default Chat
