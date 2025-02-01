/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './activities.css'

// COMPONENT IMPORTS
import SiteTitle from '../SiteTitle/SiteTitle';
import Banner from '../Banner/Banner';
import SearchBar from '../SearchBar/SearchBar';
import ActivityTile from '../ActivityTile/ActivityTile';

// Material-UI Imports
import { Container, Typography, Grid, useTheme } from '@mui/material';

// CONTEXT IMPORTS
import { ptdContext, userDataContext } from '../zContextHooks/contextHooks';

// HELPER IMPORTS
import { runSearch } from '../zzHelpers/helpers';

// FETCH IMPORTS
import { getActivities } from '../zzzFetches/fetches';
import { orange } from '@mui/material/colors';

const Activities = () => {
  const theme = useTheme(); // Access the theme for consistent styling
  const [pageToDisplay] = useContext(ptdContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayResult, setDisplayResult] = useState('');
  const [allActivities, setAllActivities] = useState('');
  const [userData, setUserData] = useContext(userDataContext)

  const fetchActivities = async () => {
    try {
      const activities = await getActivities(userData._id); // Replace with dynamic ID if possible
      setAllActivities(activities);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  const displayGames = (activityArray) => {
    if (!activityArray || activityArray.length === 0) {
      return (
        <Typography
          variant="body1"
          style={{
            color: theme.palette.text.primary, // White text
          }}
        >
          No activities available.
        </Typography>
      );
    }
    return activityArray.map((activity, i) => (
      <ActivityTile key={`game${i}`} tileData={activity} />
    ));
  };

  //* USEEFFECTS
  useEffect(() => {
    if (pageToDisplay === 'games' || pageToDisplay === 'learning') {
      fetchActivities();
    }
  }, [pageToDisplay]);

  useEffect(() => {
    if (pageToDisplay === 'games' && allActivities) {
      setDisplayResult(displayGames(allActivities.allowedGames));
    } else if (pageToDisplay === 'learning' && allActivities) {
      setDisplayResult(displayGames(allActivities.allowedLearning));
    }
  }, [pageToDisplay, allActivities]);

  useEffect(() => {
    console.log('searchTerm', searchTerm)
    if (allActivities) {
      const targetArray =
        pageToDisplay === 'games'
          ? allActivities.allowedGames
          : allActivities.allowedLearning;

      if (targetArray) {
        const searchResults = runSearch(targetArray, searchTerm);
        console.log('searhResults', searchResults)
        setDisplayResult(displayGames(searchResults));
      }
    }
  }, [allActivities, searchTerm, pageToDisplay]);

  //* RENDER
  return (
    <Container
      maxWidth="lg"
      style={{
        padding: '20px',
        backgroundColor: theme.palette.background.default, // Dark navy/teal background
        color: theme.palette.text.primary, // White text
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', // Subtle shadow
      }}
    >
      <SiteTitle />
      <Typography
        variant="h4"
        gutterBottom
        style={{
          marginBottom: '20px',
          color: theme.palette.primary.main, // Light green for title
        }}
      >
        {pageToDisplay ? `${pageToDisplay.toUpperCase()} PAGE` : 'Loading'}
      </Typography>
      <Banner />
      
      {/* Container for Category Menu and Search Bar to be aligned */}
      <div className="cateSearch-container">
        <div className="searchbar-container">
          <SearchBar setSearchTerm={setSearchTerm} />
      </div> 
      </div>

      <Grid
  container
  spacing={3}
  justifyContent="center" /* Center tiles horizontally */
  alignItems="flex-start" /* Align tiles to the top */
  style={{ marginTop: '20px' }}
>
{displayResult ? displayResult : 'Loading Activities'}
</Grid>

    </Container>
  );
};

export default Activities