/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './editChatTopic.css'

//CONTEXT IMPORTS
// pdt -> page to display
import {
  ptdContext,
  userDataContext,
  editTargetContext,
} from '../zContextHooks/contextHooks'

// FETCH IMPORTS
import {
  editChatTopic,
  deleteChatTopic,
  addChatTopic,
} from '../zzzFetches/fetches'
import { CheckBox } from '@mui/icons-material'

// MUI IMPORTS
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  IconButton,
  ThemeProvider,
  TextField,
  FormControlLabel,
  Checkbox,
  useTheme,
  Input,
  InputAdornment,
} from "@mui/material";

const EditChatTopic = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [editTarget, setEditTarget] = useContext(editTargetContext)
  const [editSaved, setEditSaved] = useState('')
  const theme = useTheme()

  //userStates pertaining to editing chat fields
  const [editTopicTitle, setEditTopicTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editDeleteTopic, setEditDeleteTopic] = useState(false)
  const [errors, setErrors] = useState({})

  //* FUNCTIONS

  //logic for pressing the save button
  const handleSave = () => {
    console.log('editDeleteTopic', editDeleteTopic)

    //delete topic if selected
    if (editDeleteTopic === true) {
      deleteChatTopic(editTarget._id)
      setEditSaved(true)
      return
    }

    //add user if new uer is being created
    if (pageToDisplay === 'addChatTopic') {
      addChatTopic(editTopicTitle, editDescription, userData._id)
      setEditSaved(true)
      return
    }

    //edit chat topic
    editChatTopic(editTarget._id, editTopicTitle, editDescription)
    setEditSaved(true)
  }

  //* USEEFFECT
  //change page back to portal after saves made
  useEffect(() => {
    if (editSaved === true) {
      setTimeout(() => {
        setPageToDisplay(userData.userType)
      }, 1000)
    }
  }, [editSaved])

  //* RENDER
  //feedback saing changes were saved
  if (editSaved) {
    return <h1>Changes Saved</h1>
  }
console.log('userData', userData)
  return (
    <>
    <ThemeProvider theme={theme}>
          {/* Form Box */}
          <Box
            sx={{
              maxWidth: 600,
              margin: '0 auto',
              padding: 4,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" color="text.primary" gutterBottom>
              {pageToDisplay === 'editChatTopic'
                ? (userData.userType === 'admin' || userData._id === editTarget.createdBy)
                  ? `Editing: ${editTarget.topicTitle}`
                  : editTarget.topicTitle
                : `Add New Chat Topic`}
            </Typography>

            
            <Box sx={{ marginBottom: 2 }}>
              {pageToDisplay === 'editChatTopic' && (
                <>
                  {[
                    { label: 'Title', value: editTarget.topicTitle, variant: 'body2' },
                    { label: 'Description', value: editTarget.description, variant: 'body3' },
                  ].map(({ label, value, variant }) => (
                    <Typography key={label} variant={variant} sx={{ marginY: 1 }}>
                      <Typography component="span" variant={'body2'} sx={{ fontWeight: 'bold', display: 'inline' }}>
                        {label}:
                      </Typography>{' '}
                      <Typography component="span" variant={'body1'} sx={{ marginLeft: 1, wordBreak: 'break-word' }}>
                      <p>{value}</p>
                      </Typography>
                    </Typography>
                  ))}
                </>
              )}
            </Box>
    
              {/* Form */}
              {pageToDisplay=== 'addChatTopic' || (pageToDisplay === 'editChatTopic' && (userData.userType==='admin' || userData._id === editTarget.createdBy) ) ? (
              <form>

                <TextField
                  label="Topic Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editTopicTitle}
                  onChange={(e) => setEditTopicTitle(e.target.value)}
                  required= {pageToDisplay === 'addChatTopic'}
                  error={errors.editTopicTitle}
                />
    
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  required= {pageToDisplay === 'addChatTopic'}
                />

                <Typography variant="body1" color="text.secondary" gutterBottom>
                Description Instruction : Give instructuions the the chat bot the more
              specific the more precice it will follow the instructions ex: 'You
              are a cat. Your name is Neko' Or ' You are a teacher you teach
              about American history, all other subjects are forbidden. The chat
              bot will automaticaly check the age of the child and present it in
              an apprpriate manner for them.
              </Typography>

              {/* Delete User Checkbox */}
              {pageToDisplay === 'editChatTopic' && (userData.userType === 'admin' || userData._id === editTarget.createdBy ) ? (
              <FormControlLabel
                control={
                <Checkbox
                  checked={editDeleteTopic}
                  onChange={(e) => setEditDeleteTopic(e.target.checked)}
                  />
                  }
                      label="Delete Chat Topic"
                      />
                  ) : ('')}

              </form>
            ) : ('')}

<Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 2,
                    ...(pageToDisplay === 'addChatTopic' || (pageToDisplay==='editChatTopic' && (userData.userType === 'admin' || userData._id === editTarget.createdBy))
                      ? { display: 'flex' }
                      : { display: 'absolute' }),
                  }}
                >
                  {/* Save and Cancel Buttons */}
                  {pageToDisplay === 'addChatTopic' || (pageToDisplay === 'editChatTopic' && (userData.userType === 'admin' || userData._id === editTarget.createdBy)) ? (
                    <>
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={
                      (pageToDisplay === 'addChatTopic' &&
                        (
                          !editDescription ||
                          !editTopicTitle 
                          )) 
                    }
                    onClick={() => handleSave()}
                  >
                    Save
                  </Button>
                  </>
                  ) : null}
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setPageToDisplay(userData.userType)}
                  >
                    Cancel
                  </Button>
                </Box>

          </Box>





                
        </ThemeProvider>






    
    </>
  )
}

export default EditChatTopic
