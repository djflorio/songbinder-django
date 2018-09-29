// Third party
import React from 'react';
import PropTypes from 'prop-types';

// Actions
import { parseSong } from '../song/SongActions';

// Components
import { DualRingLoader } from '../loaders/Loaders';
import Song from '../song/Song';


const Binder = (props) => {

  if (props.fetching) {
    return (
      <div className="binder">
        <span className="binder__loader-text">
          Loading song...
        </span>
        <DualRingLoader />
      </div>
    );
  } else {
    return (
      <div className="binder">
        {
          props.binder.songs &&
          props.binder.songs.map(song => (
            <Song title={song.title} artist={song.artist} content={parseSong(song.content)} />
          ))
        }
      </div>
    );
  }
}

Binder.propTypes = {
  binder: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired
}

export default Binder;