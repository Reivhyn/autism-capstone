/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './portal.css'

//COMPONENT IMPORTS
import SiteTitle from '../SiteTitle/SiteTitle'
import Footer from '../Footer/Footer'
import PortalList from '../PortalList/PortalList'
import LogoutButton from '../LogoutButton/LogoutButton'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/contextHooks'

// FETCH IMPORTS
import { getActivities, findKidsOfParent } from '../zzzFetches/fetches'

const Portal = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)

  //* FUNCTIONS
  const getPageData = async () => {
    if (pageToDisplay === 'parent'){
      const kidsOfParent = await findKidsOfParent()
      const allActivities = await getActivities()
      console.log('allActivities', allActivities)

    }
  }
  
  //* RENDER
  return <>
  <SiteTitle />
  <LogoutButton />
  <div className="portalListWrapper">
    <PortalList itemsToList={'a'} listType={'user'} />
    <PortalList itemsToList={'a'} listType={'kids'} />
    <PortalList itemsToList={'a'} listType={'games'} />
    <PortalList itemsToList={'a'} listType={'learning'} />
    <PortalList itemsToList={'a'} listType={'chat'} />
    <PortalList itemsToList={'a'} listType={'reporting'} />
  </div>
  </>
}

export default Portal
