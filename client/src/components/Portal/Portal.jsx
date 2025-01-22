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
  const [kidsOfParent, setKidsOfParent] = useState('')
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
      console.log('get parent data triggered in portal.jsx')
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

  return (
    <>
      <SiteTitle />
      <h2>{`${pageToDisplay.toUpperCase()} PORTAL`}</h2>

      <div className="portalListWrapper">
        {/* if pageToDisplay is admin show all users list
        first ternary function checks to see if page is admin and if needed
        data is present to display the list
        the second ternary function determins weather to retrun nothing if the 
        page to display is NOT admin or return feching data if it is admin
        */}
        {allUsers && pageToDisplay === 'admin' ? (
          <PortalList itemsToList={allUsers} listType={'user'} />
        ) : pageToDisplay === 'admin' ? (
          'fetching data'
        ) : (
          ''
        )}

        {/* if pagetodisplay is parent show kids of parent list
        first ternary function checks to see if page is parrent and if needed
        data is present to display the list
        the second ternary function determins weather to retrun nothing if the pagetodisplay is NOT parent or return fetching data */}
        {/* if user is parent display parents children */}
        {kidsOfParent && pageToDisplay === 'parent' ? (
          <PortalList itemsToList={kidsOfParent} listType={'kids'} />
        ) : pageToDisplay === 'parent' ? (
          'fetching data'
        ) : (
          ''
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

export default Portal
