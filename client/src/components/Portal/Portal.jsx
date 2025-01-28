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
import { ptdContext, userDataContext } from '../zContextHooks/contextHooks';

// FETCH IMPORTS
import { getActivities, findKidsOfParent, getAllUsers, getAllChatTopics } from '../zzzFetches/fetches';

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
          color: theme.palette.primary.main,
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        {`${pageToDisplay.toUpperCase()} PORTAL`}
      </h2>

      <div className="portalGridWrapper">
        {/* Users Column */}
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
            Users
          </h3>
          {allUsers && pageToDisplay === 'admin' ? (
            <PortalList itemsToList={allUsers} listType={'user'} />
          ) : pageToDisplay === 'admin' ? (
            <p
              className="fetchingData"
              style={{ color: theme.palette.text.secondary }}
            >
              Fetching data...
            </p>
          ) : null}
        </div>

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
          </h3>
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
          {allActivities ? (
            <PortalList itemsToList={allActivities} listType={'learning'} />
          ) : (
            <p
              className="fetchingData"
              style={{ color: theme.palette.text.secondary }}
            >
              Fetching data...
            </p>
          )}
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

      <Footer />
    </>
  );
};

export default Portal;
