/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { darkTheme } from '../zzztheme/themes.jsx'
import './EditActivity.css'

// CONTEXT IMPORTS
import {
  ptdContext,
  userDataContext,
  editTargetContext,
} from '../zContextHooks/contextHooks'

// FETCH IMPORTS
import {
  addNewActivity,
  editActivity,
  deleteActivity,
} from '../zzzFetches/fetches'

const EditActivity = () => {
  //* USESTATE
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [editSaved, setEditSaved] = useState(false)
  const [editTarget, setEditTarget] = useContext(editTargetContext)
  const theme = useTheme()

  // States for editing activity
  const [editActivityType, seteditActivityType] = useState('')
  const [editActivityTitle, seteditActivityTitle] = useState('')
  const [editDescription, seteditDescription] = useState('')
  const [editurl, setediturl] = useState('')
  const [editImageURL, seteditImageURL] = useState('')
  const [editCategory, seteditCategory] = useState('')
  const [editSearchKeywords, seteditSearchKeywords] = useState('')
  const [editDeleteActivity, setEditDeleteActivity] = useState(false)

  const [activityType, setActivityType] = useState('')
  const [ageRange, setAgeRange] = useState('')

  //* FUNCTIONS
  const callEditActivity = () => {
    editActivity(
      editTarget._id,
      editActivityType,
      editActivityTitle,
      editDescription,
      editurl,
      editImageURL,
      editCategory.split(' '),
      editSearchKeywords.split(' '),
      ageRange.split(' ')
    )
    setEditSaved(true)
  }

  const createNewActivity = () => {
    addNewActivity(
      activityType,
      editActivityTitle,
      editDescription,
      editurl,
      editImageURL,
      editCategory.split(' '),
      editSearchKeywords.split(' '),
      ageRange.split(' '),
      userData._id
    )
    setEditSaved(true)
  }

  const handleSave = () => {
    if (editDeleteActivity) {
      deleteActivity(editTarget._id)
      setEditSaved(true)
      return
    }
    if (pageToDisplay === 'addGame' || pageToDisplay === 'addLearning') {
      createNewActivity()
      return
    }
    callEditActivity()
  }

  // *USEEFFECT
  useEffect(() => {
    if (pageToDisplay === 'addGame') {
      setActivityType('game')
    }
    if (pageToDisplay === 'addLearning') {
      setActivityType('learning')
    }
  }, [pageToDisplay])

  useEffect(() => {
    if (editSaved) {
      setTimeout(() => {
        setPageToDisplay(userData.userType)
      }, 1000)
    }
  }, [editSaved])

  //* RETURN
  // feedback message when changes are saved
  if (editSaved) {
    return <h1>Changes Saved</h1>
  }
  return (
    <ThemeProvider theme={theme}>
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
          {pageToDisplay === 'editActivity'
            ? (userData._id === editTarget.createdBy || userData.userType === 'admin')
              ? `Editing: ${editTarget.activityTitle}`
              : editTarget.activityTitle
            : `Add New ${activityType}`}
        </Typography>


        <Box sx={{ marginBottom: 2 }}>
          {pageToDisplay === 'editActivity'  ? (
          <>
          <Typography variant="body2" margin={2}>
            Description: {editTarget.description}
          </Typography>
          <Typography variant="body3" margin={2}>
            URL: {editTarget.url}
            </Typography>
          <Typography variant="body2" margin={2}>
            Category: {editTarget.category}
          </Typography>
          <Typography variant="body3" margin={2}>
            Search Keywords: {editTarget.searchKeywords}
          </Typography>
          </>
          ) : null
          }
        </Box>

        {userData._id === editTarget.createdBy ||
        userData.userType === 'admin' ||
        pageToDisplay === 'addLearning' ||
        pageToDisplay === 'addGame' ? (
          <form>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editActivityTitle}
              onChange={(e) => seteditActivityTitle(e.target.value)}
              required={pageToDisplay === 'addLearning' || pageToDisplay === 'addGame'}
            />

            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editDescription}
              onChange={(e) => seteditDescription(e.target.value)}
              required={pageToDisplay === 'addLearning' || pageToDisplay === 'addGame'}
            />

            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editCategory}
              onChange={(e) => seteditCategory(e.target.value)}
              required={pageToDisplay === 'addLearning' || pageToDisplay === 'addGame'}
            />

            <TextField
              label="Search Keywords"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editSearchKeywords}
              onChange={(e) => seteditSearchKeywords(e.target.value)}
              required={pageToDisplay === 'addLearning' || pageToDisplay === 'addGame'}
            />

            <TextField
              label="URL"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editurl}
              onChange={(e) => setediturl(e.target.value)}
              required={pageToDisplay === 'addLearning' || pageToDisplay === 'addGame'}
            />

            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editImageURL}
              onChange={(e) => seteditImageURL(e.target.value)}
            />

            <TextField
              label="Age Range"
              variant="outlined"
              fullWidth
              margin="normal"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
            />

            {pageToDisplay === 'editActivity' && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editDeleteActivity}
                    onChange={(e) => setEditDeleteActivity(e.target.checked)}
                  />
                }
                label="Delete Activity"
              />
            )}

            
          </form>
        ) : null}
                
              
                <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 2,
                ...(pageToDisplay === 'addLearning' || pageToDisplay === 'addGame' || (pageToDisplay === 'editActivity' && (userData.userType === 'admin' || userData._id === editTarget.createdBy)) 
                  ? { display: 'flex' } 
                  : { display: 'absolute' }),
              }}
              >
              {/* Save and Cancel Buttons */} 
              { (pageToDisplay === 'addLearning' || pageToDisplay === 'addGame') || (pageToDisplay === 'editActivity'  && (userData.userType === 'admin' || userData._id === editTarget.createdBy)) ? (
                <>
                <Button
                variant="outlined"
                color="primary"
                disabled={
                  (pageToDisplay === 'addLearning' ||
                    pageToDisplay === 'addGame') &&
                  (!editActivityTitle ||
                    !editurl ||
                    !editCategory ||
                    !editSearchKeywords)
                }
                onClick={handleSave}
              >
                Save
              </Button>
                </>
              ) 
              : null}

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
  )
}

export default EditActivity
