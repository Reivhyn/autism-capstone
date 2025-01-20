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
import { editChatTopic } from '../zzzFetches/fetches'
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
  const [editDeleteTopic, setEditDeleteTopic] = useState('')

  //* FUNCTIONS
  const handleSave = () => {
    
  }


  //* RENDER
  return (
    <>
    <div>
      {pageToDisplay === 'editChatTopic'? `Editing ${editTarget.topicTitle}` : `Add New Chat Topic`}
    </div>
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
          placeholder="Description"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />

        {/* Age range field */}
        <input
          type="text"
          placeholder="Age Range"
          value={editAgeRange}
          onChange={(e) => setEditAgeRange(e.target.value)}
        />
      </div>

      <div className="deleteTopicWrap">
        <div>{`Delete ${editTarget.topicTitle} Topic`}</div>
        <input type='CheckBox' />
      </div>

      <div className="editTopicButtonsWrapper">
        {/* save button */}
        <button onClick={() => handleSave()} >Save</button>

        {/* cancel button */}
        <button onClick={() => setPageToDisplay(userData.userType)}>
          Cancel
        </button>
      </div>
    </>
  )
}

export default EditChatTopic
