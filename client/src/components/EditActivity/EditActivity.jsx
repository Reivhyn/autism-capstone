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
import { addNewActivity, editActivity, deleteActivity } from '../zzzFetches/fetches'

const EditActivity = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [editSaved, setEditSaved] = useState('')
  const [editTarget, setEditTarget] = useContext(editTargetContext)
  

  // usestates for adding activity
  // const [activityType, setActivityType] = useState('')
  // const [activityTitle, setActivityTitle] = useState('')
  // const [description, setDescription] = useState('')
  // const [url, seturl] = useState('')
  // const [imageURL, setImageURL] = useState('')
  // const [imagebuffer, setImagebuffer] = useState('')
  // const [imageType, setImageType] = useState('')
  // const [category, setCategory] = useState('')
  // const [educational, setEducational] = useState('')
  // const [searchKeywords, setSearchKeywords] = useState('')
  

  // usestates for editing activity
  const [editActivityType, seteditActivityType] = useState('')
  const [editActivityTitle, seteditActivityTitle] = useState('')
  const [editDescription, seteditDescription] = useState('')
  const [editurl, setediturl] = useState('')
  const [editImageURL, seteditImageURL] = useState('')
  const [editCategory, seteditCategory] = useState('')
  const [editSearchKeywords, seteditSearchKeywords] = useState('')
  const [editDeleteActivity, setEditDeleteActivity] = useState('')


  const [activityType, setActivityType] = useState('')
  const [editCatArray, setEditCatArray] = useState('')
  const [setSeachArray, setSearchArray] = useState('')
  const [ageRange, setAgeRange] = useState('')
  const [ageRangeArray, setAgeRangeArray] = useState('')
  

  // usestate for checked box
  const [checkedBox, setCheckedBox] = useState('educational')

  //* FUNCTIONS
  const handlePageDisplay = async () => {}

  // handle setting checked box
  const handleCheck = (box) => {
    setCheckedBox(box)
    seteditEducational(box === 1 ? true : false)
  }

  // save chagnes to existing activity when save button is clicked
  const callEditActivity = () => {
    console.log('edit activity called')
    // delete activity if delete checkbox is checked
    // !this breaks it?
    // if (editDeleteActivity) {
    //   deleteActivity(editTarget._id)
    //   return
    // }

    // edit chagnes if delete checkbox is not checked
    editActivity(
      editTarget._id,
      editActivityType,
      editActivityTitle,
      editDescription,
      editurl,
      editCategory,
      editSearchKeywords
    )
    setEditSaved(true)
  }

  // create new activity
  const createNewActivity = () => {
    const catArray = editCategory.split(' ')
    console.log(catArray)

    addNewActivity(
      activityType,
      editActivityTitle,
      editDescription,
      editurl,
      editCategory,
      editSearchKeywords,
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
  
  // add new activity 
  if (pageToDisplay === 'addGame' || pageToDisplay === 'addLearning') {
    createNewActivity()
    return
  }

  callEditActivity()
}

  //* useeffect
  // useEffect(() => {
  //   // set edit activity values when edit activity page is displayed
  //   if (pageToDisplay === 'editActivity') {
  //     seteditActivityType(editTarget.activityType)
  //     seteditActivityTitle(editTarget.activityTitle)
  //     seteditDescription(editTarget.description)
  //     setediturl(editTarget.url)
  //     seteditImageURL(editTarget.imageURL)
  //     seteditImagebuffer(editTarget.imagebuffer)
  //     seteditImageType(editTarget.imageType)
  //     seteditCategory(editTarget.category)
  //     seteditEducational(editTarget.educational)
  //     seteditSearchKeywords(editTarget.searchKeywords)
  //   }
  // }, [pageToDisplay])

  useEffect(() => {
    if(pageToDisplay === 'addGame') {
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
      setPageToDisplay('parent')
      }, 1500)
    }
  }, [editSaved])

  return (
    <>
    <div>
      {pageToDisplay === 'editActivity'
        ? `Editing ${editTarget.activityTitle}`
        : 'Add New Activity'}
    </div>
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
            checked={editCategory}
            onChange={(e) => {
              seteditCategory(e.target.checked)
            }}
          />
        </div>

          {/* educational in checkbox */}
          {/* <div>
          Disable Login
          <input
            type="checkbox"
            checked={editEducational}
            onChange={(e) => {
              seteditEducational(e.target.checked)
            }}
          />
        </div> */}

          {/* search keywords in field */}
          <div>
          Search Keywords
          <input
            type="text"
            checked={editSearchKeywords}
            onChange={(e) => {
              seteditSearchKeywords(e.target.checked)
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

    {pageToDisplay === 'addGame' || pageToDisplay === "addLearning" ? (
      <>

        <div className="activityTypeCheckBoxWrap">
        

          {/* display parent checkbox if page to display is admin */}
          {/* parent checkbox */}
          {pageToDisplay === 'addActivity' ? (
            <div className="buttonAndTitleWrap">
              <div>Parent</div>
              <input
                type="checkbox"
                checked={checkedBox === 'parent'}
                onChange={() => handleCheck(2)}
              />
            </div>
          ) : (
            ''
          )}

          {/* display admin checkbox if page to display is admin */}
          {/* admin checkbox */}
          {pageToDisplay === 'addActivity' ? (
            <div className="buttonAndTitleWrap">
              <div>Admin</div>
              <input
                type="checkbox"
                checked={checkedBox === 'admin'}
                onChange={() => handleCheck(3)}
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
    <div className="saveCancelButtons">
      {/* Save button */}
      <button onClick={() => handleSave()}>Save</button>

      {/* cancel button */}
      <button onClick={() => setPageToDisplay('parent')}>Cancel</button>
    </div>
  </>
  )


}
export default EditActivity
