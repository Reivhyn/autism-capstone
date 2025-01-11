/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import './portalList.css'


const PortalList = ({ itemsToList, listType }) => {
  //* USESTATE
  const [listTitle, setListTitle] = useState('')
  const [displayList, setDisplayList] = useState('')

  //* FUNCTIONS
  const setUpList = () => {
    console.log('itemsToList', itemsToList.allUsers)
    console.log('listTypeite', listType)

    if (listType === 'user') {
      setDisplayList(
        itemsToList.allUsers.map((item, i) => {
          return <li key={`item${i}`}>{item.userName}</li>
        })
      )
    }

    if (listType === 'kids') {
      setDisplayList(
        itemsToList.map((item, i) => {
          return <li key={`item${i}`}>{i}</li>
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
    console.log('listType', listType)
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
        <ul className='portalList'>{displayList ? displayList : 'failed to load list'}</ul>
        <button>Add</button>
      </div>
    </>
  )
}

export default PortalList
