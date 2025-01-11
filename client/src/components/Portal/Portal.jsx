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
  userIdContext,
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
  const [kidsOfParent, setKidsOfParent] = useState('')
  const [allUsers, setAllUsers] = useState('')

  //* FUNCTIONS
  const getParentData = async () => {
    if (pageToDisplay === 'parent') {
      setKidsOfParent(await findKidsOfParent())
      const act = await getActivities()
      setAllActivities(act)
      console.log('act', act)
    }
  }
  const getAdminData = async () => {
    if (pageToDisplay === 'admin') {
      setAllUsers(await getAllUsers(userData))
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

  useEffect(() => {
    if (pageToDisplay === 'admin') {
      console.log('USERS', allUsers)
    }
  }, [allUsers])

  //* RENDER
  if (pageToDisplay === 'admin') {
    return (
      <>
        <SiteTitle />

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
}

export default Portal
