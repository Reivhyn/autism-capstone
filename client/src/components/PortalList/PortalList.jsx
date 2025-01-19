/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import './portalList.css'

//CONTEXT IMPORTS
// pdt -> page to display
import {
  ptdContext,
  KidsOfParentContext,
  editTargetContext,
} from '../zContextHooks/contextHooks'

const PortalList = ({ itemsToList, listType }) => {
  //* USESTATE
  const [listTitle, setListTitle] = useState('')
  const [displayList, setDisplayList] = useState('')
  const [kidsOfParent, setKidsOfParent] = useContext(KidsOfParentContext)
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [editTarget, setEditTarget] = useContext(editTargetContext)

  //* FUNCTIONS
  const setUpList = () => {
    if (listType === 'user') {
      setDisplayList(
        itemsToList.allUsers.map((item) => {
          return (
            <li
              onClick={() => {
                setEditTarget(item)
                item.userType === 'kid'
                  ? setPageToDisplay('editKid')
                  : setPageToDisplay('editUser')
              }}
              key={item._id}
            >
              {`${item.firstName} ${item.lastName} (${item.userName})`}
            </li>
          )
        })
      )
    }

    // displau children list. clicking on item switches to edit page
    if (listType === 'kids') {
      setDisplayList(
        itemsToList.foundKidsOfParent.map((item) => {
          return (
            <li
              onClick={() => {
                setEditTarget(item)
                setPageToDisplay('editKid')
              }}
              key={item._id}
            >{`${item.firstName} ${item.lastName} (${item.userName})`}</li>
          )
        })
      )
    }

    if (listType === 'games') {
      setDisplayList(
        itemsToList.allGames.map((item, i) => {
          return <li key={item._id}>{item.activityTitle}</li>
        })
      )
    }

    if (listType === 'learning') {
      setDisplayList(
        itemsToList.allLearning.map((item, i) => {
          return <li key={item._id}>{item.activityTitle}</li>
        })
      )
    }

    if (listType === 'chatTopics') {
      setDisplayList(
        itemsToList.allChatTopics.map((item, i) => {
          return <li key={item._id}>{item.topicTitle}</li>
        })
      )
    }

    if (listType === 'reporting') {
      setDisplayList(
        itemsToList.map((item, i) => {
          return <li key={item._id}>{i}</li>
        })
      )
    }
  }

  const assignListTitle = () => {
    if (listType === 'user') {
      setListTitle('Users')
    }
    if (listType === 'kids') {
      setListTitle('Children')
    }
    if (listType === 'games') {
      setListTitle('Games')
    }
    if (listType === 'learning') {
      setListTitle('Learning Activities')
    }
    if (listType === 'chatTopics') {
      setListTitle('Chat Topics')
    }
    if (listType === 'reporting') {
      setListTitle('Reporting')
    }
  }

  //handles changing the page when the add button is pressed
  const handleClick = () => {
    if (listType === 'user') {
      setPageToDisplay('addUser')
      return
    }
    if (listType === 'kids') {
      setPageToDisplay('addKid')
      return
    }
    if (listType === 'games') {
      setPageToDisplay('addGame')
      return
    }
    if (listType === 'learning') {
      setPageToDisplay('addLearning')
      return
    }
    if (listType === 'chatTopics') {
      setPageToDisplay('addChatTopic')
      return
    }
  }

  //* USESTATE
  //initilize dual list
  useState(() => {
    setUpList()
    assignListTitle()
  }, [itemsToList])

  //* RENDER
  return (
    <>
      <div className="portalListWrap">
        <div className="portalTitle"></div>
        <div>{listTitle ? listTitle : 'failed to load list title'}</div>
        <ul className="portalList">
          {displayList ? displayList : 'failed to load list'}
        </ul>

        {/* //TODO onclick call function to handl click */}
        {listType !== 'reporting' ? (
          <button onClick={() => handleClick()}>Add</button>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default PortalList
