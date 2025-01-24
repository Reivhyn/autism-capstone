/* eslint-disable react/prop-types */
/*
 * This component displays the tiles users can press for games or learning activities.
 */

/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';

// CONTEXT IMPORTS
import { ptdContext } from '../zContextHooks/contextHooks';

const ActivityTile = ({ tileData }) => {
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext);

  return (
    <div className="activityTileWrapper">
      {/* Tile title */}
      <div className="activityTileTitle">{tileData.activityTitle}</div>

      {/* Tile image */}
      <img
        className="activityTileImage"
        src={tileData.imageURL}
        alt={`Image for ${tileData.activityTitle}`}
      />

      {/* Tile description */}
      <div className="activityTileDescription">{tileData.description}</div>
    </div>
  );
};

export default ActivityTile;