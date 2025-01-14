/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './editUser.css'

//COMPONENT IMPORTS
import SiteTitle from '../SiteTitle/SiteTitle'
import Footer from '../Footer/Footer'
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

  //userStates pertaining to editing user properties
  const [editFirstName, setEditFirstname] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editDateOfBirth, setEditDateOfBirth] = useState('')
  const [editUserName, setEditUserName] = useState('')
  const [editDisableLogin, setEditDisableLogin] = useState('')
  const [editDeleteKid, setEditDeleteKid] = useState('')

  //useStates pertaining to games dual list
  //games
  const [avilableGames, setAvailableGames] = useState('')
  const [selectedGames, setSelectedGames] = useState('')

  //Learning
  const [avilableLearning, setAvailableLearning] = useState('')
  const [selectedLearning, setSelectedLearning] = useState('')

  //* FUNCTIONS
  //function to retreve all user
  const fetchAllActivities = async () => {
    setAllActivities(await getActivities())
  }

  //function to initilise dual list
  const initilizeAvailableActivities = () => {
    //initilize games
    setAvailableGames(
      allActivities.allGames.map((game, i) => {
        return <li key={`availabelGame${i}`}>{game.activityTitle}</li>
      })
    )

    setSelectedGames(
      allActivities.allGames.map((game, i) => {
        if (editTarget.activitiesAccess.includes(game._id))
          return <li key={`selectedGame${i}`}>{game.activityTitle}</li>
      })
    )

    //initilize learning
    setAvailableLearning(
      allActivities.allLearning.map((learning, i) => {
        return <li key={`availabellearning${i}`}>{learning.activityTitle}</li>
      })
    )

    setSelectedLearning(
      allActivities.allLearning.map((learning, i) => {
        if (editTarget.activitiesAccess.includes(learning._id))
          return <li key={`selectedLearning${i}`}>{learning.activityTitle}</li>
      })
    )
  }

  //functions to handle add to selected list

  //make saves onece save button is pressed
  const callEditUser = () => {
    console.log('trigger') //TODO FIGURE OUT WHY ITS NOT UPDATING ON PORTAL

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

  //* USEEFFECT
  //get all activites when page is loaded
  useEffect(() => {
    if (
      pageToDisplay === 'editUser' ||
      pageToDisplay === 'addUser' ||
      pageToDisplay === 'editKid' ||
      pageToDisplay === 'addKid'
    )
      fetchAllActivities()
  }, [pageToDisplay])

  //initilize available activites after data retrived
  useEffect(() => {
    if (allActivities) {
      initilizeAvailableActivities()
    }
  }, [allActivities])

  //change page back to portal after saves made
  useEffect(() => {
    if (editSaved === true) {
      setTimeout(() => {
        setPageToDisplay('parent')
      }, 1500)
    }
  }, [editSaved])

  // * RETURN
  //feedback saing changes were saved
  if (editSaved) {
    return <h1>Changes Saved</h1>
  }

  return (
    <>
      <div>
        {pageToDisplay === 'editUser' || pageToDisplay === 'edit kid'
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

      {allActivities ? (
        <DualList dataToList={allActivities} listType='games' />
      ) : (
        'fetching data'
      )}

      {/* edit access games the user has access to */}
      <div className="dualListOuterWrap">
        {/* dual listbox title */}
        <div className="dualListTitle">Games</div>

        {/* wraps left and right side of list */}
        <div className="dualListWrapper">
          {/* available side of dual list */}
          <div className="availableWraper">
            <div className="available">Available</div>
            <ul>{avilableGames ? avilableGames : 'Fetching data'}</ul>
          </div>

          {/* selected side of dual list */}
          <div className="selectedWraper">
            <div className="selected">Selected</div>
            <ul>{selectedGames ? selectedGames : 'Fetching data'}</ul>
          </div>
        </div>
      </div>
      {/* edit access learning the user has access to */}
      <div className="dualListOuterWrap">
        {/* dual listbox title */}
        <div className="dualListTitle">Learning Activites</div>

        {/* wraps left and right side of list */}
        <div className="dualListWrapper">
          {/* available side of dual list */}
          <div className="availableWraper">
            <div className="available">Available</div>
            <ul>{avilableLearning ? avilableLearning : 'Fetching data'}</ul>
          </div>

          {/* selected side of dual list */}
          <div className="selectedWraper">
            <div className="selected">Selected</div>
            <ul>{selectedLearning ? selectedLearning : 'Fetching data'}</ul>
          </div>
        </div>
      </div>
      <div className="editGamesWrapper">
        <div className="dualListTitle">Chat Topics</div>
      </div>
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

/* 

  const handleAdd = (item) => {
    setAvailableItems(availableItems.filter((i) => i !== item));
    setSelectedItems([...selectedItems, item]);
  };

  const handleRemove = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
    setAvailableItems([...availableItems, item]);
  };

        Add/Remove Buttons 
       <div className="button-container">
       <button
         className="action-button"
         onClick={() => setSelectedItems([...selectedItems, ...availableItems])}
         disabled={availableItems.length === 0}
       >
         Add All →
       </button>
       <button
         className="action-button"
         onClick={() => setAvailableItems([...availableItems, ...selectedItems])}
         disabled={selectedItems.length === 0}
       >
         ← Remove All
       </button>
     </div>

*/
