/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import './portalList.css'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext, KidsOfParentContext, editTargetContext } from '../zContextHooks/contextHooks'

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
        itemsToList.allUsers.map((item, i) => {
          return <li key={`item${i}`}>{item.userName}</li>
        })
      )
    }

    // displau children list. clicking on item switches to edit page
    if (listType === 'kids') {
      setDisplayList(
        itemsToList.foundKidsOfParent.map((item, i) => {
          return (
            <li
              onClick={() => {
                setEditTarget(item)
                setPageToDisplay('edit')
              }}
              key={`item${i}`}
            >{`${item.firstName} ${item.lastName} (${item.userName})`}</li>
          )
        })
      )
    }

    if (listType === 'games') {
      setDisplayList(
        itemsToList.allGames.map((item, i) => {
          return <li key={`item${i}`}>{item.activityTitle}</li>
        })
      )
    }

    if (listType === 'learning') {
      setDisplayList(
        itemsToList.allLearning.map((item, i) => {
          return <li key={`item${i}`}>{item.activityTitle}</li>
        })
      )
    }

    if (listType === 'chat') {
      return itemsToList.map((item, i) => {
        return <li key={`item${i}`}>{i}</li>
      })
    }

    if (listType === 'reporting') {
      setDisplayList(
        itemsToList.map((item, i) => {
          return <li key={`item${i}`}>{i}</li>
        })
      )
    }
  }

  const assignListTitle = () => {
    if (listType === 'user') {
      setListTitle('User')
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
    if (listType === 'chat') {
      setListTitle('Chat Topics')
    }
    if (listType === 'reporting') {
      setListTitle('Reporting')
    }
  }

  //* USESTATE
  //run functions
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
        <button>Add</button>
      </div>
    </>
  )
}

export default PortalList
