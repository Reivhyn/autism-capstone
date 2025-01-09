import React, { useState } from 'react'

const PortalList = (itemsToList, listType) => {
  //* USESTATE
  const [listTitle, setListTitle] = useState('')

  //* FUNCTIONS
  const displayList = (itemsToList, listType) => {
    if(listType === 'user'){
      return itemsToList.map((item, i) => {
        return <li key={`item${i}`}>{i}</li>
      })
    }
    
    if(listType === 'kids'){
      return itemsToList.map((item, i) => {
        return <li key={`item${i}`}>{i}</li>
      })
    }
    
    if(listType === 'games'){
      return itemsToList.map((item, i) => {
        return <li key={`item${i}`}>{i}</li>
      })
    }
    
    if(listType === 'learning'){
      return itemsToList.map((item, i) => {
        return <li key={`item${i}`}>{i}</li>
      })
    }
    
    if(listType === 'chat'){
      return itemsToList.map((item, i) => {
        return <li key={`item${i}`}>{i}</li>
      })
    }
    
    if(listType === 'reporting'){
      return itemsToList.map((item, i) => {
        return <li key={`item${i}`}>{i}</li>
      })
    }
    
  }

  const assignListTitle = (listType) => {
    if(listType === 'user'){
      setListTitle('User')
    }
    if(listType === 'kids'){
      setListTitle('Children')
    }
    if(listType === 'games'){
      setListTitle('games')
    }
    if(listType === 'learning'){
      setListTitle('Learning Activities')
    }
    if(listType === 'chat'){
      setListTitle('Chat Topics')
    }
    if(listType === 'reporting'){
      setListTitle('Reporting')
    }
  }

  //* USESTATE


  //* RENDER
  return (
    <>
      <div className="portalListWrap">
        <div className="portalTitle"></div>
        <ul></ul>
        <button>Add</button>
      </div>
    </>
  )
}

export default PortalList
