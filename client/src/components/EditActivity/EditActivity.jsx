/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './EditActivity.css'

// COMPONENET IMPORTS
import SiteTitle from '../SiteTitle/SiteTitle'
import Footer from '../Footer/Footer'
import LogoutButton from '../LogoutButton/LogoutButton'

// CONTEXT IMPORTS
// pdt -> page to display
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
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [editSaved, setEditSaved] = useState(false)
  const [editTarget, setEditTarget] = useContext(editTargetContext)

  // usestates for editing activity
  const [editActivityType, seteditActivityType] = useState('')
  const [editActivityTitle, seteditActivityTitle] = useState('')
  const [editDescription, seteditDescription] = useState('')
  const [editurl, setediturl] = useState('')
  const [editImageURL, seteditImageURL] = useState('')
  const [editCategory, seteditCategory] = useState('')
  const [editSearchKeywords, seteditSearchKeywords] = useState('')
  const [editDeleteActivity, setEditDeleteActivity] = useState(false)

  const [activityType, setActivityType] = useState('')
  const [editCatArray, setEditCatArray] = useState('')
  const [setSeachArray, setSearchArray] = useState('')
  const [ageRange, setAgeRange] = useState('')
  const [ageRangeArray, setAgeRangeArray] = useState('')

  //* FUNCTIONS
  const handlePageDisplay = async () => {}

  // save chagnes to existing activity when save button is clicked
  const callEditActivity = () => {
    console.log('edit activity called')

    // edit chagnes if delete checkbox is not checked
    editActivity(
      editTarget._id,
      editActivityType,
      editActivityTitle,
      editDescription,
      editurl,
      editImageURL,
      editCategory.split(' '), // split category string into array
      editSearchKeywords.split(' '), // split search keywords string into array
      ageRange.split(' ') // split age range string into array
    )
    setEditSaved(true)
  }

  // create new activity
  const createNewActivity = () => {
    addNewActivity(
      activityType,
      editActivityTitle,
      editDescription,
      editurl,
      editImageURL,
      editCategory.split(' '), // split category string into array
      editSearchKeywords.split(' '), // split search keywords string into array
      ageRange.split(' '), // split age range string into array
      userData._id
    )
    setEditSaved(true)
  }

  const handleSave = () => {
    // delete activity if delete checkbox is checked
    if (editDeleteActivity) {
      deleteActivity(editTarget._id)
      setEditSaved(true)
      return
    }
    console.log('handle save hit')
    // add new activity
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

  // chagne page back to portal after saves are made
  useEffect(() => {
    if (editSaved) {
      setTimeout(() => {
        setPageToDisplay(userData.userType)
      }, 1000)
    }
  }, [editSaved])

  //* RETURN
  // feedback message when changes are saved
  if(editSaved) {
    return <h1>Changes Saved</h1>
  }
  return (
    <>
      <div className="currentData">
        <div>Curent Name: {editTarget.activityTitle}</div>
        <div>Current Description: {editTarget.description}</div>
        <div>Curent Image URL: {editTarget.url}</div>
        <div>Curent Category: {editTarget.category}</div>
        <div>Curent Search Keywords: {editTarget.ageRange}</div>
      </div>

      <div>
        {pageToDisplay === 'editActivity'
          ? `Editing ${editTarget.activityTitle}`
          : `Add New ${activityType}`}
      </div>

      {/* only show editing features when the user created the item */}
      {userData._id === editTarget.createdBy ||
        userData.userType === 'admin' ||
        pageToDisplay === 'addLearning' ||
        pageToDisplay === 'addGame'  ? (
        <>
          {/* form for editing activity properties */}
          <div className="formWrapper">
            <form action="">
              {/* activity name field */}
              <div>
                Name
                <input
                  type="text"
                  value={editActivityTitle}
                  onChange={(e) => {
                    seteditActivityTitle(e.target.value)
                  }}
                />
              </div>

              {/* description field */}
              <div>
                Description
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => {
                    seteditDescription(e.target.value)
                  }}
                />
              </div>

              {/* url field */}
              <div>
                URL
                <input
                  type="text"
                  value={editurl}
                  onChange={(e) => {
                    setediturl(e.target.value)
                  }}
                />
              </div>

              {/* image url field */}
              <div>
                Image url
                <input
                  type="test"
                  value={editImageURL}
                  onChange={(e) => {
                    seteditImageURL(e.target.value)
                  }}
                />
              </div>

              {/* category in field */}
              <div>
                Category
                <input
                  type="text"
                  value={editCategory}
                  onChange={(e) => {
                    seteditCategory(e.target.value)
                  }}
                />
              </div>

              {/* search keywords in field */}
              <div>
                Search Keywords
                <input
                  type="text"
                  value={editSearchKeywords}
                  onChange={(e) => {
                    seteditSearchKeywords(e.target.value)
                  }}
                />
              </div>

              {/* age range field */}
              <div>
                Age Range
                <input
                  type="text"
                  value={ageRange}
                  onChange={(e) => {
                    setAgeRange(e.target.value)
                  }}
                />
              </div>

              {/* do not show delte activity button when adding activity */}
              {pageToDisplay === 'editActivity' ? (
                <div>
                  Delete
                  <input
                    type="checkbox"
                    checked={editDeleteActivity}
                    onChange={(e) => {
                      setEditDeleteActivity(e.target.checked)
                    }}
                  />
                </div>
              ) : (
                ''
              )}
            </form>
          </div>
        </>
      ) : (
        ''
      )}

      {/* save and cancel buttons */}
      <div className="saveCancelButtons">
        {/* only show save button when user is admin or created item */}
        {userData._id === editTarget.createdBy ||
        userData.userType === 'admin' ||
        pageToDisplay === 'addLearning' ||
        pageToDisplay === 'addGame' ? (
          <>
            {/* Save button */}
            <button onClick={() => handleSave()}>Save</button>
          </>
        ) : (
          ''
        )}

        {/* cancel button */}
        <button onClick={() => setPageToDisplay(userData.userType)}>Cancel</button>
      </div>
    </>
  )
}
export default EditActivity
