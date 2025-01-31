
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
    try {
      validatePasswordCriteria(editPassword);
    } catch (error) { 
      setError(error.message);
      return false;
    } // Validate the password
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
        handlePasswordCheck()
        return true;
      };

  //saves changes to existing user when save button is pressed
  const callEditUser = () => {
    if(editPassword) {
      if(!handlePasswordCheck()) return 
    }
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

    if(!validateInputs()) return

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
      <div>
        {/* show weather adding new user or editing user */}
        {pageToDisplay === 'editUser' || pageToDisplay === 'editKid'
          ? `Editing ${editTarget.firstName} ${editTarget.lastName}`
          : userData.userType === 'admin'
          ? 'Add New User'
          : 'Add New Child'}
      </div>
      {/* form for editing user properties */}
      <div className="formWrapper">
        <form action="">
          {/* firstName field */}
          <div>
            First Name
            <input
              type="text"
              value={editFirstName}
              onChange={(e) => {
                setEditFirstname(e.target.value)
              }}
            />
          </div>

          {/* laastName field */}
          <div>
            Last Name
            <input
              type="text"
              value={editLastName}
              onChange={(e) => {
                setEditLastName(e.target.value)
              }}
            />
          </div>

          {/* DOB field */}
          <div>
            Date of Birth
            <input
              type="date"
              value={editDateOfBirth}
              onChange={(e) => {
                setEditDateOfBirth(e.target.value)
              }}
            />
          </div>

          {/* userName field */}
          <div>
            UserName
            <input
              type="text"
              value={editUserName}
              onChange={(e) => {
                setEditUserName(e.target.value)
              }}
            />
          </div>

          {/* email field */}
          <div>
            Email
            <input
              type="email"
              value={editEmail}
              onChange={(e) => {
                setEditEmail(e.target.value)
              }}
            />
          </div>

          {/* password field */}
          <div>
            Password
            <input
              type="password"
              value={editPassword}
              onChange={(e) => {
                setEditPassword(e.target.value)
              }}
            />
          </div>

          <div>
            {confirmPassword && editPassword
              ? confirmPassword !== editPassword
                ? 'Passwords do not match'
                : ''
              : ''}
          </div>

          {/* confirm password field */}
          <div>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            />
          </div>

          {/* disble log in checkbox */}
          <div>
            Disable Login
            <input
              type="checkbox"
              checked={editDisableLogin}
              onChange={(e) => {
                setEditDisableLogin(e.target.checked)
              }}
            />
          </div>

            {/* error message */}
            {error && <Typography color='error'>{error}</Typography>}
          {/* do not show delete user button when adding user 
          or for logged in user */}
          {(pageToDisplay === 'editkid' || pageToDisplay === 'editUser') &&
          userData._id !== editTarget._id ? (
            <div>
              Delete {`${editTarget.firstName} ${editTarget.lastName}`}
              <input
                type="checkbox"
                checked={editDeleteUser}
                onChange={() => {
                  setEditDeleteUser(!editDeleteUser)
                }}
              />
            </div>
          ) : (
            ''
          )}
        </form>
      </div>

      {pageToDisplay === 'addKid' || pageToDisplay === 'addUser' ? (
        <>
          <div>User Type</div>

          <div className="userTypeCheckBoxWrap">
            {/* child checkbox */}
            <div className="buttonAndTitleWrap">
              <div>Child</div>
              <input
                type="checkbox"
                checked={checkedBox === 'kid' || pageToDisplay === 'addKid'}
                onChange={() => handleCheck('kid')}
              />
            </div>

            {/* display parent checkbox if page to display is admin */}
            {/* parent checkbox */}
            {pageToDisplay === 'addUser' ? (
              <div className="buttonAndTitleWrap">
                <div>Parent</div>
                <input
                  type="checkbox"
                  checked={checkedBox === 'parent'}
                  onChange={() => handleCheck('parent')}
                />
              </div>
            ) : (
              ''
            )}

            {/* display admin checkbox if page to display is admin */}
            {/* admin checkbox */}
            {pageToDisplay === 'addUser' ? (
              <div className="buttonAndTitleWrap">
                <div>Admin</div>
                <input
                  type="checkbox"
                  checked={checkedBox === 'admin'}
                  onChange={() => handleCheck('admin')}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        ''
      )}

      {/* only show dual list if editing or adding kid */}

     {/* this is start of new */}
     {/* this is END of new */}


      {/* games duallist */} 
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

      {/* learning duallist */}
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

      {/* chat topics duallist */}
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

      <div className="saveCancelButtons">
        {/* Save button */}
        <button
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
        </button>

        {/* cancel button */}
        <button onClick={() => hangleCancelButton()}>Cancel</button>
      </div>
    </>
  )
}

export default EditUser
