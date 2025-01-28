/*
 * This component contains the banner displayed on each page
 */

/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';

// CONTEXT IMPORTS
import { ptdContext } from '../zContextHooks/contextHooks.jsx';
// Import CSS
import './Banner.css';

const Banner = () => {
  const [pageToDisplay] = useContext(ptdContext);

  const bannerText = () => {
    if (pageToDisplay === 'landing') {
      return 'Fun or learning your adventure starts here!';
    }
    if (pageToDisplay === 'learning') {
      return 'Welcome to the learning page! Select an activity.';
    }
    if (pageToDisplay === 'games') {
      return 'Welcome to the games page! Select a game';
    }
    if (pageToDisplay === 'chat') {
      return 'Say hi to our chat bot.';
    }
    return 'Welcome to our site';
  };

  return (
    <h2 className="bannerText">{pageToDisplay ? bannerText() : 'Welcome'}</h2>
  );
};

export default Banner;