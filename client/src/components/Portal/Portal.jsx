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
import {
  ptdContext,
  userDataContext,
} from '../zContextHooks/contextHooks';

// FETCH IMPORTS
import {
  getActivities,
  findKidsOfParent,
  getAllUsers,
  getAllChatTopics,
} from '../zzzFetches/fetches';

const Portal = () => {
  const theme = useTheme(); // Access the theme for colors and styling

  // USESTATE
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
      setKidsOfParent(await findKidsOfParent(userData));
      setAllActivities(await getActivities());
      setAllChatTopics(await getAllChatTopics());
    }
  };

  // USEEFFECT
  useEffect(() => {
    if (pageToDisplay === 'admin') {
      getAdminData();
    }
  }, [pageToDisplay]);

  useEffect(() => {
    if (pageToDisplay === 'parent') {
      getParentData();
    }
  }, [pageToDisplay]);

  // RENDER
  return (
    <>
      <SiteTitle />
      <h2
        style={{
          color: theme.palette.primary.main, // Light green text
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        {`${pageToDisplay.toUpperCase()} PORTAL`}
      </h2>

      <div
        className="portalListWrapper"
        style={{
          backgroundColor: theme.palette.background.paper, // Deep teal background
          color: theme.palette.text.primary, // White text
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', // Subtle shadow
        }}
      >
        {allUsers && pageToDisplay === 'admin' ? (
          <PortalList itemsToList={allUsers} listType={'user'} />
        ) : pageToDisplay === 'admin' ? (
          'fetching data'
        ) : (
          ''
        )}

        {kidsOfParent && pageToDisplay === 'parent' ? (
          <PortalList itemsToList={kidsOfParent} listType={'kids'} />
        ) : pageToDisplay === 'parent' ? (
          'fetching data'
        ) : (
          ''
        )}

        {allActivities ? (
          <PortalList itemsToList={allActivities} listType={'games'} />
        ) : (
          'Fetching Data'
        )}

        {allActivities ? (
          <PortalList itemsToList={allActivities} listType={'learning'} />
        ) : (
          'Fetching Data'
        )}

        {allChatTopics ? (
          <PortalList itemsToList={allChatTopics} listType={'chatTopics'} />
        ) : (
          'Fetching Data'
        )}
      </div>

      <Footer />
    </>
  );
};

export default Portal;