
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './editUser.css'

//COMPONENT IMPORTS
import SiteTitle from '../SiteTitle/SiteTitle'
import LogoutButton from '../LogoutButton/LogoutButton'
import DualList from '../DualList/DualList'

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

// HELPERS IMPORTS
import { validatePasswordCriteria } from '../zzHelpers/helpers'

const EditUser = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [allActivities, setAllActivities] = useState('')
  const [editTarget, setEditTarget] = useContext(editTargetContext)
  const [allUsers, setAllUsers] = useState('')
  const [editSaved, setEditSaved] = useState('') 
  const theme = useTheme()


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
  const [error, setError] = useState('')

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

  //validate inputs
  const handlePasswordCheck = () => {
    if(!editPassword) return true
    setError(''); // Clear any previous errors
    try {
      validatePasswordCriteria(editPassword);
    } catch (error) { 
      setError(error.message);
      return false;
    } // Validate the password
    if (editPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    } // Check if the passwords match

    setError('');

    return true;
  }

  //validate inputs
  const validateInputs = () => {
        setError(''); // Clear any previous errors
        console.log(editPassword, confirmPassword); // Log the passwords
        if (!editUserName || !editFirstName || !editLastName || !editEmail || !editPassword || !confirmPassword || !editDateOfBirth) {
          console.log('All fields are required.'); // Log the error
          setError('All fields are required.');
          return false;
        }
        if(!handlePasswordCheck()) return false
        return true;
      };

  //saves changes to existing user when save button is pressed
  const callEditUser = () => {
    if(editPassword && !handlePasswordCheck()) return //check password criteria
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
    if(!validateInputs()) return
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
  const hangleCancelButton = () => {
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
      }, 500)
    }
  }, [editSaved])

  // * RENDER
  //feedback saing changes were saved
  if (editSaved) {
    return <h1>Changes Saved</h1>
  }

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
              {pageToDisplay === 'editUser' || pageToDisplay === 'editKid'
                ? `Editing ${editTarget.firstName} ${editTarget.lastName}`
                : userData.userType === 'admin'
                ? `Add New User`
                : `Add New Child`}
            </Typography>
    
            <Box sx={{ marginBottom: 2 }}>
              {pageToDisplay === 'editUser' || pageToDisplay === 'editKid' ? (
                <>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                Current Data:
              </Typography>
              <Typography variant="body2">
                Date of Birth: {editTarget.dob.trim().split('T')[0]}
              </Typography>
              <Typography variant="body2">
                UserName: {editTarget.userName}
              </Typography>
              <Typography variant="body2">
                Email: {editTarget.email}
              </Typography>
              </>) : ('')}
            </Box>
    
            
              <form>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editFirstName}
                  onChange={(e) => setEditFirstname(e.target.value)}
                  required= {pageToDisplay === 'addUser' || pageToDisplay === 'addKid'}
                />
    
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                  required= {pageToDisplay === 'addUser' || pageToDisplay === 'addKid'}

                />

              <TextField
                label="Date of Birth"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editDateOfBirth}
                onChange={(e) => setEditDateOfBirth(e.target.value)}
                InputLabelProps={{
                  shrink: true, // Ensures label does not overlap the value
                }}
                required= {pageToDisplay === 'addUser' || pageToDisplay === 'addKid'}

              />

                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editUserName}
                  onChange={(e) => setEditUserName(e.target.value)}
                  required= {pageToDisplay === 'addUser' || pageToDisplay === 'addKid'}
                />
    
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required= {pageToDisplay === 'addUser' || pageToDisplay === 'addKid'}

                />
    
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  required= {pageToDisplay === 'addUser' || pageToDisplay === 'addKid'}

                />
    
                {/* Display an error message if the passwords do not match */}
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required= {pageToDisplay === 'addUser' || pageToDisplay === 'addKid' || editPassword}

                />

                {error && <Typography color="error">{error}</Typography>}

                {(pageToDisplay === 'editUser' || pageToDisplay === 'editKid') && userData._id !== editTarget._id ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={editDeleteUser}
                        onChange={(e) => setEditDeleteUser(e.target.checked)}
                      />
                    }
                    label="Delete User"
                  />
                ) : (
                  ''
                )}
              </form>
                {/* check boxes */}
                {pageToDisplay === 'addKid' || pageToDisplay === 'addUser' ? (
                  <>
                  {userData.userType === 'admin' ? (
                    <>
                        <FormControlLabel
                        control={
                          <Checkbox
                          checked={userType === 'admin'}
                          onChange={() => handleCheck('admin')}
                          />
                        }
                        label="Admin"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                          checked={userType === 'parent'}
                          onChange={() => handleCheck('parent')}
                          />
                        }
                        label="Parent"
                      />
                      <FormControlLabel
                      control={
                        <Checkbox
                        checked={userType === 'kid'}
                        onChange={() => handleCheck('kid')}
                        />
                      }
                      label="Kid"
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
                    </>
                  ) : (
                    ''
                  )}
                  </>
                ) : ('')}
                
          </Box>
          {/* dual list box */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 2,
              gap: 2,
            }}
          >
            {allActivities &&
            (pageToDisplay === 'editKid' || pageToDisplay === 'addKid') ? (
              <DualList
                dataToList={allActivities}
                listType="games"
                gamesAccess={gamesAccess}
                setGamesAccess={setGamesAccess}
              />
            ) : pageToDisplay === 'edditKid' || pageToDisplay === 'addKid' ? (
              'fetching data'
            ) : (
              ''
            )}

            {allActivities &&
            (pageToDisplay === 'editKid' || pageToDisplay === 'addKid') ? (
              <DualList
                dataToList={allActivities}
                listType="learning"
                learingAccess={learingAccess}
                setLearningAccess={setLearningAccess}
              />
            ) : pageToDisplay === 'edditKid' || pageToDisplay === 'addKid' ? (
              'fetching data'
            ) : (
              ''
            )}

            {allChatTopics &&
            (pageToDisplay === 'editKid' || pageToDisplay === 'addKid') ? (
              <DualList
                dataToList={allChatTopics}
                listType="chatTopics"
                chatAccess={chatAccess}
                setChatAccess={setChatAccess}
              />
            ) : pageToDisplay === 'edditKid' || pageToDisplay === 'addKid' ? (
              'fetching data'
            ) : (
              ''
            )}


          </Box>


                <Box
                  sx={{
                    display: 'flex',
                    marginTop: 2,
                    justifyContent: 'center',
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={
                      (pageToDisplay === 'addUser' &&
                        (!editFirstName ||
                          !editLastName ||
                          !editDateOfBirth ||
                          !editPassword)) ||
                      confirmPassword !== editPassword
                    }
                    onClick={() => handleSave()}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setPageToDisplay(userData.userType)}
                  >
                    Cancel
                  </Button>
                </Box>
        </ThemeProvider>
    
    </>
  )
}

export default EditUser
