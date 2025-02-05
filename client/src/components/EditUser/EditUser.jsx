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
} from '@mui/material'

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
  const [errors, setErrors] = useState({}) // Initialize the error state as an empty object

  //useStates pertaining to games dual list
  const [gamesAccess, setGamesAccess] = useState('')
  const [learningAccess, setLearningAccess] = useState('')
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
    if (!editPassword) return true
    setErrors('') // Clear any previous errors
    try {
      validatePasswordCriteria(editPassword)
    } catch (error) {
      setErrors(error.message)
      return false
    } // Validate the password
    if (editPassword !== confirmPassword) {
      setErrors('Passwords do not match.')
      return false
    } // Check if the passwords match

    setErrors('')

    return true
  }

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  //validate inputs
  const validateInputs = () => {
    let newErrors = {} // Initialize error object

    if (!editFirstName) newErrors.firstName = 'First Name is required.'
    if (!editLastName) newErrors.lastName = 'Last Name is required.'
    if (!editDateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required.'
    if (!editUserName) newErrors.userName = 'Username is required.'
    if (!editEmail) {
      newErrors.email = 'Email is required.'
    } else if (!validateEmail(editEmail)) {
      newErrors.email = 'Invalid email format.'
    }

    if (!editPassword) {
      newErrors.password = 'Password is required.'
    } else {
      try {
        validatePasswordCriteria(editPassword)
      } catch (error) {
        newErrors.password = error.message
      }
    }

    if (!confirmPassword)
      newErrors.confirmPassword = 'Confirm Password is required.'

    if (editPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }

    setErrors(newErrors) // Update errors state

    return Object.keys(newErrors).length === 0 // Return true if no errors
  }

  //saves changes to existing user when save button is pressed
  const callEditUser = () => {
    if (editPassword && !handlePasswordCheck()) return //check password criteria
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
    if (!validateInputs()) return
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

  // check for enabbled or disabled status on page load
  useEffect(() => {
    if (pageToDisplay === 'editUser' || pageToDisplay === 'editKid')
      setEditDisableLogin(editTarget.disabled)
  }, [])

  //update learning access when its updated on the dual list
  useEffect(() => {
    setActivitiesAccess([...gamesAccess, ...learningAccess])
  }, [gamesAccess, learningAccess])

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

  if(pageToDisplay === 'editKid'){
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* current data flex */}
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Box
          sx={{
            borderRadius: 2,
            marginBottom: 3,
            padding: 2,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: `0px 4px 6px ${theme.palette.primary.main}`,
          }}
        >
          {/* current data box */}
          <Typography variant="h5" color="text.primary" gutterBottom>
            {pageToDisplay === 'editUser' || pageToDisplay === 'editKid'
              ? `Editing ${editTarget.firstName} ${editTarget.lastName}`
              : userData.userType === 'admin'
              ? `Add New User`
              : `Add New Child`}
          </Typography>
          {(pageToDisplay === 'editKid' || pageToDisplay === 'editUser') && (
            <>
              {[
                {
                  label: 'Date of Birth',
                  value: new Date(
                    editTarget.dob.trim().split('T')[0]
                  ).toLocaleDateString('en-US'),
                  variant: 'body2',
                },
                {
                  label: 'Username',
                  value: editTarget.userName,
                  variant: 'body3',
                },
                { label: 'Email', value: editTarget.email, variant: 'body2' }, //emails not set to return on a search in the db
              ].map(({ label, value, variant }) => (
                <Typography key={label} variant={variant} sx={{ marginY: 1 }}>
                  <Typography
                    component="span"
                    variant={variant}
                    sx={{ fontWeight: 'bold', display: 'inline' }}
                  >
                    {label} :
                  </Typography> {value}
                  <Typography
                    component="span"
                    variant={variant}
                    sx={{ marginLeft: 1, wordBreak: 'break-word' }}
                  >
                  </Typography>
                </Typography>
              ))}
            </>
          )}
        </Box>
        </Box>

        {/* Form and dual list flex wrap */}
        <Box sx={{ display: 'flex', gap: '2vw' }}>
          {/* Form Box */}
          <Box
            sx={{
              maxWidth: 400,
              margin: '0 auto',
              padding: 3,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              boxShadow: `0px 4px 6px ${theme.palette.primary.main}`,
            }}
          >
            {/* flex box for form */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                maxHeight: '1vh',
              }}
            >
              {/* lef of form */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editFirstName}
                  onChange={(e) => setEditFirstname(e.target.value)}
                  required={
                    !!(
                      pageToDisplay === 'addUser' || pageToDisplay === 'addKid'
                    )
                  }
                  error={!!errors.firstName} // Display an error message if the first name is invalid
                  helperText={errors.firstName && errors.firstName}
                />

                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                  required={
                    !!(
                      pageToDisplay === 'addUser' || pageToDisplay === 'addKid'
                    )
                  }
                  error={!!errors.lastName} // Display an error message if the last name is invalid
                  helperText={errors.lastName && errors.lastName}
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
                  required={
                    !!(
                      pageToDisplay === 'addUser' || pageToDisplay === 'addKid'
                    )
                  }
                  error={!!errors.dateOfBirth} // Display an error message if the date of birth is invalid
                  helperText={errors.dateOfBirth && errors.dateOfBirth}
                />

                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editUserName}
                  onChange={(e) => setEditUserName(e.target.value)}
                  required={
                    !!(
                      pageToDisplay === 'addUser' || pageToDisplay === 'addKid'
                    )
                  }
                  error={!!errors.userName} // Display an error message if the username is invalid
                  helperText={errors.userName && errors.userName}
                />
              </Box>
              {/* right of form */}
              <Box>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required={
                    !!(
                      pageToDisplay === 'addUser' || pageToDisplay === 'addKid'
                    )
                  }
                  error={!!errors.email} // Display an error message if the email is invalid
                  helperText={errors.email && errors.email}
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  required={
                    !!(
                      pageToDisplay === 'addUser' || pageToDisplay === 'addKid'
                    )
                  }
                  error={!!errors.password} // Display an error message if the password is invalid
                  helperText={errors.password && errors.password}
                />

                {/* Display an error message if the passwords do not match */}
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)

                    // Validate password match as the user types
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      confirmPassword:
                        e.target.value !== editPassword
                          ? 'Passwords do not match.'
                          : '',
                    }))
                  }}
                  required={
                    !!(
                      pageToDisplay === 'addUser' ||
                      pageToDisplay === 'addKid' ||
                      editPassword
                    )
                  }
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 2,
                  }}
                >
                  {pageToDisplay === 'editUser' ||
                  pageToDisplay === 'editKid' ? (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!editDeleteUser}
                            onChange={(e) =>
                              setEditDeleteUser(e.target.checked)
                            }
                          />
                        }
                        label="Delete User"
                      />
                    </>
                  ) : (
                    ''
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!editDisableLogin}
                        onChange={(e) => setEditDisableLogin(e.target.checked)}
                      />
                    }
                    label="Disable Login"
                  />
                </Box>
              </Box>
            </Box>

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
                  </>
                ) : (
                  ''
                )}
              </>
            ) : (
              ''
            )}
          </Box>
          {/* dual list box */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens, horizontal on larger
              justifyContent: { xs: 'center', sm: 'space-between' }, // Center items on small screens
              alignItems: { xs: 'center', sm: 'flex-start' }, // Align properly when stacked
              gap: 2,
              width: '100%',
            }}
          >
            {allActivities && pageToDisplay === 'editKid' ? (
              <DualList
                dataToList={allActivities}
                listType="games"
                gamesAccess={gamesAccess}
                setGamesAccess={setGamesAccess}
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '45%' }, // Limit width on larger screens
                }}
              />
            ) : pageToDisplay === 'editKid' ? (
              'fetching data'
            ) : (
              ''
            )}

            {allActivities && pageToDisplay === 'editKid' ? (
              <DualList
                dataToList={allActivities}
                listType="learning"
                learingAccess={learningAccess}
                setLearningAccess={setLearningAccess}
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '45%' }, // Limit width on larger screens
                }}
              />
            ) : pageToDisplay === 'editKid' ? (
              'fetching data'
            ) : (
              ''
            )}

            {allChatTopics && pageToDisplay === 'editKid' ? (
              <DualList
                dataToList={allChatTopics}
                listType="chatTopics"
                chatAccess={chatAccess}
                setChatAccess={setChatAccess}
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '45%' }, // Limit width on larger screens
                }}
              />
            ) : pageToDisplay === 'editKid' ? (
              'fetching data'
            ) : (
              ''
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on mobile, horizontal on larger screens
            justifyContent: 'center',
            gap: 2,
            marginTop: 2,
            width: '100%',
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            disabled={
              ((pageToDisplay === 'addUser' || pageToDisplay === 'addKid') &&
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

// OLD LOGIC FOR PAGE THIS WORKS WITH EVERYTHING BUT LOGIC IS GETTING MEsSY

return (
  <>
    <ThemeProvider theme={theme}>
      {/* Form Box */}
      <Box
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          padding: 3,
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
          {(pageToDisplay === 'editKid' || pageToDisplay === 'editUser') && (
            <>
              {[
                {
                  label: 'Date of Birth',
                  value: new Date(
                    editTarget.dob.trim().split('T')[0]
                  ).toLocaleDateString('en-US'),
                  variant: 'body2',
                },
                {
                  label: 'Username',
                  value: editTarget.userName,
                  variant: 'body3',
                },
                { label: 'Email', value: editTarget.email, variant: 'body2' }, //emails not set to return on a search in the db
              ].map(({ label, value, variant }) => (
                <Typography key={label} variant={variant} sx={{ marginY: 1 }}>
                  <Typography
                    component="span"
                    variant={variant}
                    sx={{ fontWeight: 'bold', display: 'inline' }}
                  >
                    {label}:
                  </Typography>{' '}
                  <Typography
                    component="span"
                    variant={variant}
                    sx={{ marginLeft: 1, wordBreak: 'break-word' }}
                  >
                    <p>{value}</p>
                  </Typography>
                </Typography>
              ))}
            </>
          )}
        </Box>

        <form>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editFirstName}
            onChange={(e) => setEditFirstname(e.target.value)}
            required={
              !!(pageToDisplay === 'addUser' || pageToDisplay === 'addKid')
            }
            error={!!errors.firstName} // Display an error message if the first name is invalid
            helperText={errors.firstName && errors.firstName}
          />

          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
            required={
              !!(pageToDisplay === 'addUser' || pageToDisplay === 'addKid')
            }
            error={!!errors.lastName} // Display an error message if the last name is invalid
            helperText={errors.lastName && errors.lastName}
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
            required={
              !!(pageToDisplay === 'addUser' || pageToDisplay === 'addKid')
            }
            error={!!errors.dateOfBirth} // Display an error message if the date of birth is invalid
            helperText={errors.dateOfBirth && errors.dateOfBirth}
          />

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editUserName}
            onChange={(e) => setEditUserName(e.target.value)}
            required={
              !!(pageToDisplay === 'addUser' || pageToDisplay === 'addKid')
            }
            error={!!errors.userName} // Display an error message if the username is invalid
            helperText={errors.userName && errors.userName}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            required={
              !!(pageToDisplay === 'addUser' || pageToDisplay === 'addKid')
            }
            error={!!errors.email} // Display an error message if the email is invalid
            helperText={errors.email && errors.email}
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
            required={
              !!(pageToDisplay === 'addUser' || pageToDisplay === 'addKid')
            }
            error={!!errors.password} // Display an error message if the password is invalid
            helperText={errors.password && errors.password}
          />

          {/* Display an error message if the passwords do not match */}
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)

              // Validate password match as the user types
              setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword:
                  e.target.value !== editPassword
                    ? 'Passwords do not match.'
                    : '',
              }))
            }}
            required={
              !!(
                pageToDisplay === 'addUser' ||
                pageToDisplay === 'addKid' ||
                editPassword
              )
            }
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 2,
            }}
          >
            {pageToDisplay === 'editUser' || pageToDisplay === 'editKid' ? (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!editDeleteUser}
                      onChange={(e) => setEditDeleteUser(e.target.checked)}
                    />
                  }
                  label="Delete User"
                />
              </>
            ) : (
              ''
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!editDisableLogin}
                  onChange={(e) => setEditDisableLogin(e.target.checked)}
                />
              }
              label="Disable Login"
            />
          </Box>
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
              </>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}
      </Box>
      {/* dual list box */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens, horizontal on larger
          justifyContent: { xs: 'center', sm: 'space-between' }, // Center items on small screens
          alignItems: { xs: 'center', sm: 'flex-start' }, // Align properly when stacked
          marginTop: 2,
          gap: 2,
          width: '100%',
        }}
      >
        {allActivities && pageToDisplay === 'editKid' ? (
          <DualList
            dataToList={allActivities}
            listType="games"
            gamesAccess={gamesAccess}
            setGamesAccess={setGamesAccess}
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: '45%' }, // Limit width on larger screens
            }}
          />
        ) : pageToDisplay === 'editKid' ? (
          'fetching data'
        ) : (
          ''
        )}

        {allActivities && pageToDisplay === 'editKid' ? (
          <DualList
            dataToList={allActivities}
            listType="learning"
            learingAccess={learningAccess}
            setLearningAccess={setLearningAccess}
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: '45%' }, // Limit width on larger screens
            }}
          />
        ) : pageToDisplay === 'editKid' ? (
          'fetching data'
        ) : (
          ''
        )}

        {allChatTopics && pageToDisplay === 'editKid' ? (
          <DualList
            dataToList={allChatTopics}
            listType="chatTopics"
            chatAccess={chatAccess}
            setChatAccess={setChatAccess}
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: '45%' }, // Limit width on larger screens
            }}
          />
        ) : pageToDisplay === 'editKid' ? (
          'fetching data'
        ) : (
          ''
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on mobile, horizontal on larger screens
          justifyContent: 'center',
          gap: 2,
          marginTop: 2,
          width: '100%',
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          disabled={
            ((pageToDisplay === 'addUser' || pageToDisplay === 'addKid') && 
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
