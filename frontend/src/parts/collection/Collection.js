// Third party
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import './Collection.css';

// Actions
import { parseSong } from '../song/SongActions';

// Components
import { DualRingLoader } from '../loaders/Loaders';
import Song from '../song/Song';


const Collection = (props) => {

  if (props.fetching) {
    return (
      <div className="collection">
        <span className="collection__loader-text">
          Loading song...
        </span>
        <DualRingLoader />
      </div>
    );
  } else {
    return (
      <div className="collection">
        {
          props.collection.songs &&
          props.collection.songs.map(song => (
            <Song title={song.title} artist={song.artist} content={parseSong(song.content)} />
          ))
        }
      </div>
    );
  }
}

Collection.propTypes = {
  collection: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired
}

export default Collection;