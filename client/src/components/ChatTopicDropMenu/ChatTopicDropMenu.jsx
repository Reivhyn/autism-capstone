/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react'
import './chatTopicDropMenu.css'

// FETCH IMPORTS
import {
  getAllChatTopics
} from '../zzzFetches/fetches'
import { userDataContext } from '../zContextHooks/contextHooks'

const ChatTopicDropMenu = () => {
  //* USESTATE
    const [userData, setUserData] = useContext(userDataContext)
  const [allChatTopics, setAllChatTopics] = useState([])
  const [allowedTopics, setAllowedTopics] = useState('')
  //* FUNCTIONS

  //get all topics then get allowed topics
  const getTopics = async () => {
    const allTopics = (await getAllChatTopics())
    const arr = []
    allTopics.array.forEach(topic => {
      if(userData.chatAccess.includes(topic._id)){
        arr.push(topic)
      }
      setAllowedTopics(arr)
    });
  }
  
  //* RENDER
  return (
    <>
    <div className="chatDrop">
      <button className='chatDropButton' >Chat Topics</button>

      {/* chat drop content */}
      <div className="chatDropItems">
      {chatDropRender? chatDropRender : ''}
      </div>
    </div>
    </>
  )
}

export default ChatTopicDropMenu