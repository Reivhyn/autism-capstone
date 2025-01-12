/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './editUser.css'

//COMPONENT IMPORTS
import SiteTitle from '../SiteTitle/SiteTitle'
import Footer from '../Footer/Footer'
import LogoutButton from '../LogoutButton/LogoutButton'

//CONTEXT IMPORTS
// pdt -> page to display
import {
  ptdContext,
  userDataContext,
  KidsOfParentContext,
  editTargetContext
} from '../zContextHooks/contextHooks'

// FETCH IMPORTS
import {
  getActivities,
  findKidsOfParent,
  getAllUsers,
  editUser,
  deleteUser,
} from '../zzzFetches/fetches'

const EditUser = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [allActivities, setAllActivities] = useState('')
  const [editTarget, setEditTarget] = useContext(editTargetContext)
  const [allUsers, setAllUsers] = useState('')
  const [editSaved, setEditSaved] = useState('')

  const [editFirstName, setEditFirstname] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editDateOfBirth, setEditDateOfBirth] = useState('')
  const [editUserName, setEditUserName] = useState('')
  const [editDisableLogin, setEditDisableLogin] = useState('')
  const [editDeleteKid, setEditDeleteKid] = useState('')

  //* FUNCTIONS
  //make saves onece save button is pressed
  const callEditUser = () => {
    console.log('trigger');
    
    //delete user user if checkbox is selected
    if (editDeleteKid === true) {
      
      deleteUser(editTarget._id)
      setEditSaved(true)
      return
    }

    //edit changes if delete user is not selected
    editUser(
      editTarget._id,
      editFirstName,
      editLastName,
      editDateOfBirth,
      editUserName,
      editDisableLogin,
      editDeleteKid
    )
    setEditSaved(true)
  }

  // //* USEEFFECT
  useEffect(() => {
    if(editSaved === true){
      setTimeout(() => {
        setPageToDisplay('parent')
      }, 1500);
    }
  },[editSaved])

  // * RETURN
  //show page for edditing a user
if(editSaved){
  return(
    <h1>Changes Saved</h1>
  )
}

  return (
    <>
      <div>
        {pageToDisplay === 'edit'
          ? `Editing ${editTarget.firstName} ${editTarget.lastName}`
          : 'Add New Child'}
      </div>

      {/* form for editing user properties */}
      <div className="formWrapper">
        <form action="">
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
          <div>
            Date of Birth
            <input
              type="text"
              value={editDateOfBirth}
              onChange={(e) => {
                setEditDateOfBirth(e.target.value)
              }}
            />
          </div>
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
          <div>
            Delete Child
            <input
              type="checkbox"
              checked={editDeleteKid}
              onChange={(e) => {
                setEditDeleteKid(e.target.checked)
              }}
            />
          </div>
        </form>
      </div>

      {/* edit access games the user has access to */}
      <div className="editGamesWrapper"></div>
      <div className="editGamesWrapper"></div>
      <div className="editGamesWrapper"></div>

      <div className="saveCancelButtons">
        {/* Save button */}
        <button onClick={() => callEditUser()}>Save</button>

        {/* cancel button */}
        <button onClick={() => setPageToDisplay('parent')}>Cancel</button>
      </div>
    </>
  )
}

export default EditUser
