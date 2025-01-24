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
import Footer from '../Footer/Footer';

// Material-UI Imports
import { Container, Typography, Grid } from '@mui/material';

// CONTEXT IMPORTS
import { ptdContext } from '../zContextHooks/contextHooks';

// HELPER IMPORTS
import { runSearch } from '../zzHelpers/helpers';

// FETCH IMPORTS
import { getActivities } from '../zzzFetches/fetches';

const Activities = () => {
  const [pageToDisplay,] = useContext(ptdContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayResult, setDisplayResult] = useState(null);
  const [allActivities, setAllActivities] = useState(null);

  const fetchActivities = async () => {
    try {
      const activities = await getActivities('6775ffb83fecb4f3f4b6e22e'); // Replace with dynamic ID if possible
      setAllActivities(activities);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  const displayGames = (activityArray) => {
    if (!activityArray || activityArray.length === 0) {
      return <Typography variant="body1">No activities available.</Typography>;
    }
    return activityArray.map((activity, i) => (
      <ActivityTile key={`game${i}`} tileData={activity} />
    ));
  };

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
    if (allActivities) {
      const targetArray =
        pageToDisplay === 'games'
          ? allActivities.allowedGames
          : allActivities.allowedLearning;

      if (targetArray) {
        const searchResults = runSearch(targetArray, searchTerm);
        setDisplayResult(displayGames(searchResults));
      }
    }
  }, [allActivities, searchTerm, pageToDisplay]);

  return (
    <Container
      maxWidth="lg"
      style={{ padding: '20px', backgroundColor: '#121212', color: '#FFFFFF' }}
    >
      <SiteTitle />
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
        {pageToDisplay ? `${pageToDisplay.toUpperCase()} PAGE` : 'Loading'}
      </Typography>
      <Banner />
      <div className="dropSearch-container">
        <div className="searchbar-container">
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>
      </div>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {displayResult || (
          <Typography variant="body1">Loading Activities...</Typography>
        )}
      </Grid>
      <Footer />
    </Container>
  );
};

export default Activities;