/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react'
import './chatTopicDropMenu.css'

// FETCH IMPORTS
import { getAllChatTopics } from '../zzzFetches/fetches'
import { userDataContext } from '../zContextHooks/contextHooks'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/contextHooks'

const ChatTopicDropMenu = ({ currentTopic, setCurrentTopic }) => {
  //* USESTATE
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [allowedTopics, setAllowedTopics] = useState('')
  const [displayList, setdisplayList] = useState('')

  //* FUNCTIONS
  //get all topics then get allowed topics
  const getTopics = async () => {
    const arr = []
    const allTopics = await getAllChatTopics()
    allTopics.allChatTopics.forEach((topic) => {
      if (userData.chatAccess.includes(topic._id)) {
        arr.push(topic)
      }
    })
    setAllowedTopics(arr)
  }

  //render drop menu items
  const renderList = () => {
    setdisplayList(
      allowedTopics.map((topic) => {
        return (
          <div
            className="chatTopicItem"
            key={topic._id}
            onClick={() => setCurrentTopic(topic)}
          >
            {topic.topicTitle} 
          </div>
        )
      })
    )
  }

  //* USEEFFECT
  //get topics on component load
  useEffect(() => {
    if (pageToDisplay === 'chat') {
      getTopics()
    }
  }, [pageToDisplay])

  //render list
  useEffect(() => {
    if (allowedTopics) {
      renderList()
    }
  }, [allowedTopics])

  //* RENDER
  return (
    <div className="dropMenu">
      <h2>{currentTopic ? currentTopic.topicTitle : 'Choose A Topic'}</h2>
      <div className="dropContent">
        {/* button to go home */}
        {displayList ? displayList : ''}
      </div>
    </div>
  )
}

export default ChatTopicDropMenu
