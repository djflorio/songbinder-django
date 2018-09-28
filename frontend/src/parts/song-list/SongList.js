// Third party
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';

// Assets
import './SongList.css';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';

// Components
import { DualRingLoader } from '../loaders/Loaders';
import IconButton from '../icon-button/IconButton';


const SongList = (props) => {

  const { songs, createSong, deleteSong, fetching } = props;

  return (
    <div className="song-list">
      <IconButton
        onClick={createSong}
        icon={faPlus}
        text="New Song"
      />
      <table className="song-list__list">
        <thead className="song-list__list-header">
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
        {
          !fetching &&
          songs.map(song => {
            return (
              <tr key={song.id} className="song-list__item">
                <td>
                  <Link to={"/songs/" + song.id} className="song-list__view-link">
                    {song.title === "" ? "Untitled" : song.title}
                  </Link>
                </td>
                <td>
                  {song.artist === "" ? "Unknown Artist" : song.artist}
                </td>
                <td>
                  <Link
                    to={"/songs/edit/" + song.id}
                    className="song-list__button">
                    <FontAwesome icon={faEdit} />
                  </Link>
                  <FontAwesome
                    icon={faTimes}
                    className="song-list__button"
                    onClick={() => deleteSong(song.id, song.title)}
                  />
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
      {
        fetching &&
        <div className="song-list__loader">
          <span className="song-list__loader-text">
            Loading song list...
          </span>
          <DualRingLoader />
        </div>
      }
    </div>
  )
}

SongList.propTypes = {
  songs: PropTypes.array.isRequired,
  deleteSong: PropTypes.func.isRequired,
  createSong: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired
}

export default SongList;