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
import {
  ptdContext,
  userDataContext,
  KidsOfParentContext,
} from '../zContextHooks/contextHooks'

// FETCH IMPORTS
import {
  getActivities,
  findKidsOfParent,
  getAllUsers,
} from '../zzzFetches/fetches'

const Portal = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)
  const [allActivities, setAllActivities] = useState('')
  const [kidsOfParent, setKidsOfParent] = useContext(KidsOfParentContext)
  const [allUsers, setAllUsers] = useState('')

  //* FUNCTIONS
  const getAdminData = async () => {
    if (pageToDisplay === 'admin') {
      setAllUsers(await getAllUsers(userData))
      setAllActivities(await getActivities())
    }
  }

  const getParentData = async () => {
    if (pageToDisplay === 'parent') {
      console.log('get parent data triggered in portal.jsx');
      setKidsOfParent(await findKidsOfParent(userData))
      setAllActivities(await getActivities())
    }
  }

  //* USEEFECT

  //get admin data when page is displayed
  useEffect(() => {
    if (pageToDisplay === 'admin') {
      getAdminData()
    }
  }, [pageToDisplay])

  //get parent data when page is displayed
  useEffect(() => {
    if (pageToDisplay === 'parent') {
      getParentData()
    }
  }, [pageToDisplay])

  //* RENDER
  // render admin portal
  if (pageToDisplay === 'admin') {
    return (
      <>
        <SiteTitle />
        <h2>{`${pageToDisplay.toUpperCase()} PORTAL`}</h2>

        
        <div className="portalListWrapper">
          {/* all users list */}
          {allUsers ? (
            <PortalList itemsToList={allUsers} listType={'user'} />
          ) : (
            'Fetching Data'
          )}

          {/* all games list */}
          {allActivities ? (
            <PortalList itemsToList={allActivities} listType={'games'} />
          ) : (
            'Fetching Data'
          )}

          {/* all learning list */}
          {allActivities ? (
            <PortalList itemsToList={allActivities} listType={'learning'} />
          ) : (
            'Fetching Data'
          )}
        </div>

        <Footer />
      </>
    )
  }

  //render parent portal
  if (pageToDisplay === 'parent') {
    return (
      <>
        <SiteTitle />
        <h2>{`${pageToDisplay.toUpperCase()} PORTAL`}</h2>

        <div className="portalListWrapper">
          {/* all users list */}
          {kidsOfParent ? (
            <PortalList itemsToList={kidsOfParent} listType={'kids'} />
          ) : (
            'Fetching Data'
          )}

          {/* all games list */}
          {allActivities ? (
            <PortalList itemsToList={allActivities} listType={'games'} />
          ) : (
            'Fetching Data'
          )}

          {/* all learning list */}
          {allActivities ? (
            <PortalList itemsToList={allActivities} listType={'learning'} />
          ) : (
            'Fetching Data'
          )}
        </div>

        <Footer />
      </>
    )
  }
}

export default Portal
