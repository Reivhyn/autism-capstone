/* eslint-disable react/prop-types */
/*
 * This component displays the tiles users can press for games or learning activities.
 */

/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';

// CONTEXT IMPORTS
import { ptdContext } from '../zContextHooks/contextHooks';

// MATERIAL-UI Imports
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const ActivityTile = ({ tileData }) => {
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext);

  return (
    <Card 
      className="activityTileWrapper" 
      sx={{
        width: '100%', 
        maxWidth: 300, 
        margin: 'auto',
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* Tile image */}
      <CardMedia
        component="img"
        height="180"
        image={tileData.imageURL}
        alt={`Image for ${tileData.activityTitle}`}
        style={{ objectFit: 'cover' }}
      />

      {/* Tile content */}
      <CardContent>
        {/* Tile title */}
        <Typography variant="h6" component="div" textAlign="center">
          {tileData.activityTitle}
        </Typography>

        {/* Tile description */}
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {tileData.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActivityTile;
