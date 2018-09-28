// Third party
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';

// Assets
import './CollectionEditor.css';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

const AvailableSongs = (props) => (
  <ul className="collection-editor__list available-songs">
  {
    props.songs &&
    props.songs.map(song => (
      song.collections.indexOf(props.collection) === -1 &&
      <li
        className="collection-editor__list-song available-songs__song"
        key={song.id}
        onClick={() => props.onClick("add", song.id, props.collection)}>
        {song.title === "" ? "Untitled" : song.title}
        &nbsp;-&nbsp;
        {song.artist === "" ? "Unknown Artist" : song.artist}
        <span className="available-songs__add">
          <FontAwesome
            icon={faPlus}
            className="available-songs__add-icon"
          />
          Add
        </span>
      </li>
    ))
  }
  </ul>
);

const CollectionSongs = (props) => (
  <ul className="collection-editor__list collection-songs">
  {
    props.songs &&
    props.songs.map(song => (
      <li
        className="collection-editor__list-song collection-songs__song"
        key={song.id}
        onClick={() => props.onClick("remove", song.id, props.collection)}>
        {song.title === "" ? "Untitled" : song.title}
        &nbsp;-&nbsp;
        {song.artist === "" ? "Unknown Artist" : song.artist}
      </li>
    ))
  }
  </ul>
)

const CollectionEditor = (props) => {

  const { songs, collection, onAddRemove } = props;

  return (
    <div className="collection-editor">
      <div className="collection-editor__header">
        <h1 className="collection-editor__title">
          {collection.title}
          <span className="collection-editor__title-edit">
            edit title
          </span>
        </h1>
      </div>
      <div className="collection-editor__body">
        <div className="collection-editor__col collection-editor__col--left">
          <h3 className="collection-editor__subtitle collection-editor__subtitle--available">
            Available songs
            <span className="collection-editor__subtitle-instructions">
              (click to add)
            </span>
          </h3>
          <AvailableSongs
            songs={songs}
            collection={collection.id}
            onClick={onAddRemove}
          />
        </div>
        <div className="collection-editor__col collection-editor__col--right">
          <h3 className="collection-editor__subtitle collection-editor__subtitle--added">
            Added to collection
            <span className="collection-editor__subtitle-instructions">
              (drag to reorder)
            </span>
          </h3>
          <CollectionSongs
            songs={collection.songs}
            collection={collection.id}
            onClick={onAddRemove}
          />
        </div>
      </div>
    </div>
  );
}

CollectionEditor.propTypes = {
  collection: PropTypes.object.isRequired,
  songs: PropTypes.array.isRequired,
  onAddRemove: PropTypes.func.isRequired
}

export default CollectionEditor;