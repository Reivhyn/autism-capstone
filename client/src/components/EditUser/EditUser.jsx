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
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { darkTheme } from '../zzztheme/themes'
import DualList from '../DualList/DualList'
import './editUser.css'

//CONTEXT IMPORTS
// pdt -> page to display
import {
  ptdContext,
  userDataContext,
  KidsOfParentContext,
  editTargetContext,
} from '../zContextHooks/contextHooks'

// FETCH IMPORTS
import {
  getActivities,
  findKidsOfParent,
  getAllUsers,
  editUser,
  deleteUser,
  addNewUser,
  getAllChatTopics,
} from '../zzzFetches/fetches'
import { use } from 'react'
import { Email } from '@mui/icons-material'

const EditUser = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [allActivities, setAllActivities] = useState('')
  const [editTarget, setEditTarget] = useContext(editTargetContext)
  const [allUsers, setAllUsers] = useState('')
  const [editSaved, setEditSaved] = useState('')

  //userStates pertaining to editing user properties
  const [editFirstName, setEditFirstname] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editDateOfBirth, setEditDateOfBirth] = useState('')
  const [editUserName, setEditUserName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPassword, setEditPassword] = useState('')
  const [editDisableLogin, setEditDisableLogin] = useState('')
  const [editDeleteUser, setEditDeleteUser] = useState('')
  const [userType, setUserType] = useState('kid')
  const [parentUser, setParentUser] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  //useStates pertaining to games dual list
  const [gamesAccess, setGamesAccess] = useState('')
  const [learingAccess, setLearningAccess] = useState('')
  const [allChatTopics, setAllChatTopics] = useState('')
  const [chatAccess, setChatAccess] = useState('')

  //combines the two access arrays to be passed when save button is pressed
  const [activitiesAccess, setActivitiesAccess] = useState('')

  //handles the usertype ckeckbox values
  const [checkedBox, setCheckedBox] = useState('kid')

  //* FUNCTIONS
  //function to retreve all activities
  const fetchAllData = async () => {
    setAllActivities(await getActivities())
    setAllChatTopics(await getAllChatTopics())
  }

  //hanle setting userType
  const handleCheck = (value) => {
    setCheckedBox(value)
    setUserType(value)
  }

  //saves changes to existing user when save button is pressed
  const callEditUser = () => {
    //delete user user if checkbox is selected

    //edit changes if delete user is not selected
    editUser(
      editTarget._id,
      editFirstName,
      editLastName,
      editDateOfBirth,
      editUserName,
      editPassword,
      editDisableLogin,
      activitiesAccess,
      editEmail,
      chatAccess
    )
    setEditSaved(true)
  }

  // creates new user when save button is pressed
  const callCreateNewUser = () => {
    addNewUser(
      editFirstName,
      editLastName,
      editDateOfBirth,
      editUserName,
      editPassword,
      editDisableLogin,
      activitiesAccess,
      editEmail,
      userType,
      userData._id
    )

    setEditSaved(true)
  }

  const handleSave = () => {
    //delete user if selected
    if (editDeleteUser === true) {
      deleteUser(editTarget._id)
      setEditSaved(true)
      return
    }

    //add user if new user is being created
    if (pageToDisplay === 'addUser' || pageToDisplay === 'addKid') {
      callCreateNewUser()
      return
    }
    //else edit user
    callEditUser()
  }

  // handle cancel button
  const handleCancel = () => {
    setPageToDisplay(userData.userType)
  }

  //* USEEFFECT
  //get all data when page is loaded
  useEffect(() => {
    if (
      pageToDisplay === 'editUser' ||
      pageToDisplay === 'addUser' ||
      pageToDisplay === 'editKid' ||
      pageToDisplay === 'addKid'
    )
      fetchAllData()
  }, [pageToDisplay])

  //update learning access when its updated on the dual list
  useEffect(() => {
    setActivitiesAccess([...gamesAccess, ...learingAccess])
  }, [gamesAccess, learingAccess])

  //change page back to portal after saves made
  useEffect(() => {
    if (editSaved === true) {
      setTimeout(() => {
        setPageToDisplay(userData.userType)
      }, 1000)
    }
  }, [editSaved])

  // * RETURN
  //feedback saing changes were saved
  if (editSaved) {
    return <h1>Changes Saved</h1>
  }

  //* RENDER
  return (
    <ThemeProvider theme={darkTheme}>
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
          {pageToDisplay === 'editUser' || pageToDisplay === 'editKid'
            ? `Editing ${editTarget.firstName} ${editTarget.lastName}`
            : pageToDisplay === 'addUser'
            ? 'Add New User'
            : 'Add New Child'}
        </Typography>

        <form>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editFirstName}
            onChange={(e) => setEditFirstname(e.target.value)}
          />

          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
          />

          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editDateOfBirth}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setEditDateOfBirth(e.target.value)}
          />

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editUserName}
            onChange={(e) => setEditUserName(e.target.value)}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
          />
          <div>
            {confirmPassword && editPassword
              ? confirmPassword !== editPassword
                ? 'Passwords do not match'
                : ''
              : ''}
          </div>

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={editDisableLogin}
                onChange={(e) => setEditDisableLogin(e.target.checked)}
              />
            }
            label="Disable Login"
          />

          {pageToDisplay === 'editKid' || pageToDisplay === 'editUser' ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={editDeleteUser}
                  onChange={(e) => setEditDeleteUser(e.target.checked)}
                />
              }
              label={`Delete ${editTarget.firstName} ${editTarget.lastName}`}
            />
          ) : null}
        </form>

        {pageToDisplay === 'addUser' || pageToDisplay === 'addKid' ? (
          <Box>
            <Typography>User Type</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedBox === 'kid'}
                  onChange={() => handleCheck('kid')}
                />
              }
              label="Child"
            />
            {pageToDisplay === 'addUser' && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedBox === 'parent'}
                      onChange={() => handleCheck('parent')}
                    />
                  }
                  label="Parent"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedBox === 'admin'}
                      onChange={() => handleCheck('admin')}
                    />
                  }
                  label="Admin"
                />
              </>
            )}
          </Box>
        ) : null}

        {allActivities &&
        (pageToDisplay === 'editKid' || pageToDisplay === 'addKid') ? (
          <>
            <DualList
              dataToList={allActivities}
              listType="games"
              gamesAccess={gamesAccess}
              setGamesAccess={setGamesAccess}
            />
            <DualList
              dataToList={allActivities}
              listType="learning"
              learningAccess={learingAccess}
              setLearningAccess={setLearningAccess}
            />
            <DualList
              dataToList={allChatTopics}
              listType="chatTopics"
              chatAccess={chatAccess}
              setChatAccess={setChatAccess}
            />
          </>
        ) : null}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={
              (pageToDisplay === 'addUser' &&
                (!editFirstName ||
                  !editLastName ||
                  !editDateOfBirth ||
                  !editPassword)) ||
              confirmPassword !== editPassword
            }
            onClick={handleSave}
          >
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default EditUser
