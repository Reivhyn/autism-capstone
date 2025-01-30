/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import './portal.css';

// COMPONENT IMPORTS
import SiteTitle from '../SiteTitle/SiteTitle';
import Footer from '../Footer/Footer';
import PortalList from '../PortalList/PortalList';
import LogoutButton from '../LogoutButton/LogoutButton';

// CONTEXT IMPORTS
// pdt -> page to display
import { 
  ptdContext, 
  userDataContext
} from '../zContextHooks/contextHooks';

// FETCH IMPORTS
import {
  getActivities,
  findKidsOfParent,
  getAllUsers,
  getAllChatTopics
} from '../zzzFetches/fetches'


const Portal = () => {
  const theme = useTheme(); // Access the theme for colors and styling

  // USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext);
  const [userData, setUserData] = useContext(userDataContext);
  const [allActivities, setAllActivities] = useState('');
  const [kidsOfParent, setKidsOfParent] = useState('');
  const [allUsers, setAllUsers] = useState('');
  const [allChatTopics, setAllChatTopics] = useState('');

  // FUNCTIONS
  const getAdminData = async () => {
    if (pageToDisplay === 'admin') {
      setAllUsers(await getAllUsers(userData));
      setAllActivities(await getActivities());
      setAllChatTopics(await getAllChatTopics());
    }
  };

  const getParentData = async () => {
    if (pageToDisplay === 'parent') {
      //determins which page to display
      setKidsOfParent(await findKidsOfParent(userData));
      setAllActivities(await getActivities());
      setAllChatTopics(await getAllChatTopics());
    }
  };

  // USEEFFECT

   //get admin data when page is displayed
  useEffect(() => {
    if (pageToDisplay === 'admin') {
      getAdminData();
    }
  }, [pageToDisplay]);

  //get parent data when page is displayed
  useEffect(() => {
    if (pageToDisplay === 'parent') {
      getParentData();
    }
  }, [pageToDisplay]);

  // RENDER
   // render admin portal
  
  return (
    <>
      <SiteTitle />
      <h2
        style={{
          color: theme.palette.primary.main,
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        {`${pageToDisplay.toUpperCase()} PORTAL`}
      </h2>

      <div className="portalGridWrapper">
        {/* if pageToDisplay is admin show all users list
        first ternary function checks to see if page is admin and if needed
        data is present to display the list
        the second ternary function determins weather to retrun nothing if the 
        page to display is NOT admin or return feching data if it is admin
        */}
        {pageToDisplay === 'admin' && (
  <div 
  className="portalColumn" 
  style={{
    backgroundColor: theme.palette.background.paper, // Keeps MUI theme colors
    color: theme.palette.text.primary,
    boxShadow: `0px 4px 6px ${theme.palette.primary.main}`
  }}
>
  <h3 style={{ color: theme.palette.primary.main }}>Users</h3>
  <div className="portalListWrapper">
    {allUsers ? (
      <PortalList itemsToList={allUsers} listType={'user'} />
    ) : (
      <p className="fetchingData" style={{ color: theme.palette.text.secondary }}>
        Fetching data...
      </p>
    )}
  </div>
</div>
)}
        
{/* If user is a parent, display their children */}
{/* Show kids list if the user is a parent or admin */}
{(pageToDisplay === 'parent') && (
  <div 
  className="portalColumn" 
  style={{
    backgroundColor: theme.palette.background.paper, 
    color: theme.palette.text.primary,
    boxShadow: `0px 4px 6px ${theme.palette.primary.main}`
  }}
>
  <h3 style={{ color: theme.palette.primary.main }}>Children</h3>
  <div className="portalListWrapper">
    {kidsOfParent ? (
      <PortalList itemsToList={kidsOfParent} listType={'kids'} />
    ) : (
      <p className="fetchingData" style={{ color: theme.palette.text.secondary }}>
        Fetching data...
      </p>
    )}
  </div>
</div>

)}
        
        {/* Games Column */}
        <div
          className="portalColumn"
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: `0px 4px 6px ${theme.palette.primary.main}`,
          }}
        >
          <h3
            style={{
              color: theme.palette.secondary.main,
            }}
          >
            Games
          </h3><div className="portalListWrapper">
          {allActivities ? (
            <PortalList itemsToList={allActivities} listType={'games'} />
          ) : (
            <p
              className="fetchingData"
              style={{ color: theme.palette.text.secondary }}
            >
              Fetching data...
            </p>
          )}
        </div>
</div>
        {/* Learning Activities Column */}
        <div
          className="portalColumn"
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: `0px 4px 6px ${theme.palette.primary.main}`,
          }}
        >
          <h3
            style={{
              color: theme.palette.primary.main,
            }}
          >
            Learning Activities
          </h3>
          <div className="portalListWrapper">
          {allActivities ? (
            <PortalList itemsToList={allActivities} listType={'learning'} />
          ) : (
            <p
              className="fetchingData"
              style={{ color: theme.palette.text.secondary }}
            >
              Fetching data..
            </p> 
          )}
        </div>
        </div>

        {/* Chat Topics Column */}
        <div
          className="portalColumn"
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: `0px 4px 6px ${theme.palette.primary.main}`,
          }}
        >
          <h3
            style={{
              color: theme.palette.secondary.main,
            }}
          >
            Chat Topics
          </h3>
          <div className="portalListWrapper">
          {allChatTopics ? (
            <PortalList itemsToList={allChatTopics} listType={'chatTopics'} />
          ) : (
            <p
              className="fetchingData"
              style={{ color: theme.palette.text.secondary }}
            >
              Fetching data...
            </p>
          )}
        </div>
      </div>
      </div>

      <Footer />
    </>
  );
};

export default Portal;