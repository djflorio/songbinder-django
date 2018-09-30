// Third party
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';

// Assets
import './BinderEditor.css';


const AvailableSongs = (props) => (
  <ul className="binder-editor__list available-songs">
  {
    props.songs &&
    props.songs.map(song => (
      song.binders.indexOf(props.binder) === -1 &&
      <li
        className="binder-editor__list-song available-songs__song"
        key={song.id}
        onClick={() => props.onClick("add", song.id, props.binder)}>
        {song.title === "" ? "Untitled" : song.title}
        &nbsp;-&nbsp;
        {song.artist === "" ? "Unknown Artist" : song.artist}
        <span className="available-songs__add">
          <FontAwesome
            icon={['fas', 'plus']}
            className="available-songs__add-icon"
          />
          Add
        </span>
      </li>
    ))
  }
  </ul>
);

const BinderSongs = (props) => (
  <ul className="binder-editor__list binder-songs">
  {
    props.songs &&
    props.songs.map(song => (
      <li
        className="binder-editor__list-song binder-songs__song"
        key={song.id}
        onClick={() => props.onClick("remove", song.id, props.binder)}>
        {song.title === "" ? "Untitled" : song.title}
        &nbsp;-&nbsp;
        {song.artist === "" ? "Unknown Artist" : song.artist}
      </li>
    ))
  }
  </ul>
)

const BinderEditor = (props) => {

  const { songs, binder, onAddRemove } = props;

  return (
    <div className="binder-editor">
      <div className="binder-editor__header">
        <h1 className="binder-editor__title">
          {binder.title}
          <span className="binder-editor__title-edit">
            edit title
          </span>
        </h1>
      </div>
      <div className="binder-editor__body">
        <div className="binder-editor__col binder-editor__col--left">
          <h3 className="binder-editor__subtitle binder-editor__subtitle--available">
            Available songs
            <span className="binder-editor__subtitle-instructions">
              (click to add)
            </span>
          </h3>
          <AvailableSongs
            songs={songs}
            binder={binder.id}
            onClick={onAddRemove}
          />
        </div>
        <div className="binder-editor__col binder-editor__col--right">
          <h3 className="binder-editor__subtitle binder-editor__subtitle--added">
            Added to binder
            <span className="binder-editor__subtitle-instructions">
              (drag to reorder)
            </span>
          </h3>
          <BinderSongs
            songs={binder.songs}
            binder={binder.id}
            onClick={onAddRemove}
          />
        </div>
      </div>
    </div>
  );
}

BinderEditor.propTypes = {
  binder: PropTypes.object.isRequired,
  songs: PropTypes.array.isRequired,
  onAddRemove: PropTypes.func.isRequired
}

export default BinderEditor;