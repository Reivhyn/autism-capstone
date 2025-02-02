/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/*
* This component displays the tiles users can press for games or learning activities.
 */

import React, { useContext } from 'react';
import './ActivityTile.css'

// CONTEXT IMPORTS
import { ptdContext } from '../zContextHooks/contextHooks';

// MATERIAL-UI Imports
import { Card, CardMedia, CardContent, Typography, Link, useTheme } from '@mui/material';



const ActivityTile = ({ tileData }) => {
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext);
  const theme = useTheme();

  return (
    <Card 
      className="activityTileWrapper" 
      sx={{
        width: '100%', 
        maxWidth: 300, 
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 'auto',
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Link href={tileData.url} underline='none' target='_blank' rel='noreferrer'>
      {/* Tile image */}
      <CardMedia
        component="img"
        height="180"
        image={tileData.imageURL}
        alt={`Image for ${tileData.activityTitle}`}
        style={{ objectFit: 'cover' }}
        onError={(e) => {
          e.target.src = 'src/assets/SiteLogo.png';
        }}
      />
      {/* Tile content */}
      <CardContent>
        {/* Tile title */}
        <Typography variant="h6" component="div" textAlign="center">
          {tileData.activityTitle}
        </Typography>

        {/* Tile description */}
        <Typography variant="body2" color="text.secondary" textAlign="center">
          <div className='activityDescription'>
          {tileData.description}
          </div>
        </Typography>
      </CardContent>
      </Link>
    </Card>
  );
};

export default ActivityTile;


