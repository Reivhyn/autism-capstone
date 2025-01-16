import React, { useContext, useEffect, useState } from 'react';
import './activities.css';

// COMPONENT IMPORTS
import SiteTitle from '../SiteTitle/SiteTitle';
import Banner from '../Banner/Banner';
import DropMenu from "../DropMenu/DropMenu";
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
  // USESTATE
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayResult, setDisplayResult] = useState('');
  const [allActivities, setAllActivities] = useState('');

  // FUNCTIONS
  const fetchActivities = async () => {
    setAllActivities(await getActivities('6775ffb83fecb4f3f4b6e22e')); // TODO REMOVE HARD CODE
  };

  const displayGames = (activityArray) => {
    return activityArray.map((activity, i) => {
      return <ActivityTile key={`game${i}`} tileData={activity} />;
    });
  };

  // USEEFFECTS
  useEffect(() => {
    if (pageToDisplay === 'games' || pageToDisplay === 'learning') {
      fetchActivities();
    }
  }, [pageToDisplay]);

  useEffect(() => {
    if (pageToDisplay === 'games' && allActivities) {
      setDisplayResult(displayGames(allActivities.allowedGames));
    }
  }, [allActivities]);

  useEffect(() => {
    if (pageToDisplay === 'learning' && allActivities) {
      setDisplayResult(displayGames(allActivities.allowedLearning));
    }
  }, [allActivities]);

  useEffect(() => {
    if (pageToDisplay === 'games' && allActivities) {
      const searchResults = runSearch(allActivities.allowedGames, searchTerm);
      setDisplayResult(displayGames(searchResults));
    }

    if (pageToDisplay === 'learning' && allActivities) {
      const searchResults = runSearch(allActivities.allowedLearning, searchTerm);
      setDisplayResult(displayGames(searchResults));
    }
  }, [searchTerm]);

  // RENDER
  return (
    <Container maxWidth="lg" style={{ padding: '20px', backgroundColor: '#121212', color: '#FFFFFF' }}>
      <SiteTitle />

      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
        {pageToDisplay ? `${pageToDisplay.toUpperCase()} PAGE` : 'Loading'}
      </Typography>

      <Banner />

      {/* Place DropMenu in desired location */}
      <div className="dropsearch-container">
        <DropMenu />
        <div className="searchbar-container">
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {/* Grid for activities */}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {displayResult ? (
          displayResult
        ) : (
          <Typography variant="body1">Loading Activities...</Typography>
        )}
      </Grid>

      <Footer />
    </Container>
  );
};

export default Activities;