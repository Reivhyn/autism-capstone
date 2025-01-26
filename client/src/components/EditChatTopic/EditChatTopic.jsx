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

const EditChatTopic = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [editTarget, setEditTarget] = useContext(editTargetContext)
  const [editSaved, setEditSaved] = useState('')

  //userStates pertaining to editing chat fields
  const [editTopicTitle, setEditTopicTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editAgeRange, setEditAgeRange] = useState('')
  const [editDeleteTopic, setEditDeleteTopic] = useState(false)

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
    editChatTopic(editTarget._id, editTopicTitle, editDescription, )
    setEditSaved(true)
  }

  //* USEEFFECT
  //change page back to portal after saves made
  useEffect(() => {
    if (editSaved === true) {
      setTimeout(() => {
        setPageToDisplay(userData.userType)
      }, 1500)
    }
  }, [editSaved])

  //* RENDER
  //feedback saing changes were saved
  if (editSaved) {
    return <h1>Changes Saved</h1>
  }

  return (
    <>
      {/* title being edited */}
      <div>
        {pageToDisplay === 'editChatTopic'
          ? `Editing ${editTarget.topicTitle}`
          : `Add New Chat Topic`}
      </div>

      {/* current data */}
      <div className="currentData">
        <div>Current Title: {editTarget.topicTitle}</div>
        <div>Current Description: {editTarget.description}</div>
        <div>Current Age Range: {editTarget.ageRage}</div>
      </div>

      {/* only show editing features when the user created the item */}
      {userData._id === editTarget.createdBy ||
      userData.userType === 'admin' ||
      pageToDisplay === 'addChatTopic' ? (
        <>
          <div className="editTopicFieldsWrapper">
            {/* TopicTitle field */}
            <input
              type="text"
              placeholder="Topic Title"
              value={editTopicTitle}
              onChange={(e) => setEditTopicTitle(e.target.value)}
            />

            {/* Description Filed */}
            <textarea
              type="text"
              placeholder="System Instruction : give instructuions the the chat bot the more specific the more precice it will follow the instructions ex: 'You are a cat. Your name is Neko' Or  ' You are a teacher you teach about American history, all other subjects are forbidden. The chat bot will automaticaly check the age of the child and present it in an apprpriate manner for them" 
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </div>

          {/* delete topic check box */}
          {pageToDisplay === 'editChatTopic' ? (
            <div className="deleteTopicWrap">
              <div>{`Delete ${editTarget.topicTitle} Topic`}</div>
              <input
                type="CheckBox"
                onChange={() => {
                  setEditDeleteTopic(!editDeleteTopic)
                }}
              />
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}

      <div className="editTopicButtonsWrapper">
        {/* only show save button when user is admin or created item */}
        {userData._id === editTarget.createdBy ||
        userData.userType === 'admin' ||
        pageToDisplay === 'addChatTopic' ? (
          <>
            {/* Save button */}
            <button onClick={() => handleSave()}>Save</button>
          </>
        ) : (
          ''
        )}

        {/* cancel button */}
        <button onClick={() => setPageToDisplay(userData.userType)}>
          Cancel
        </button>
      </div>
    </>
  )
}

export default EditChatTopic
