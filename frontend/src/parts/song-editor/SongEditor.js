// Third party
import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';

// Assets
import './SongEditor.css';
import faBan from '@fortawesome/fontawesome-free-solid/faBan';
import faSave from '@fortawesome/fontawesome-free-solid/faSave';

// Components
import Song from '../song/Song';


const TextInput = ({name, song, onChange, placeholder}) => {
  return (
    <div className={"songeditor__input-container"}>
      <input
        className={"songeditor__input"}
        onChange={
          (event) => onChange(name, song, event.target.value)
        }
        defaultValue={song[name]}
        placeholder={placeholder}
      />
    </div>
  );
}

const TextAreaInput = ({name, song, onChange}) => {
  return (
    <div className={"songeditor__textarea-container"}>
      <textarea
        className={"songeditor__textarea"}
        onChange={
          (event) => onChange("content", song, event.target.value)
        }
        value={song[name]}
      />
    </div>
  );
}

const InputPane = (props) => {
  const { song, onCancel, onSave, onChange, onModulate, history } = props;
  return (
    <div className="songeditor__input-pane">
    <div className="songeditor__topbar">
      <button
        className="songeditor__button songeditor__button--cancel"
        onClick={onCancel}>
        <FontAwesome icon={faBan} /> Cancel
      </button>
      <button
        className="songeditor__button"
        onClick={() => onSave(song, false)}>
        <FontAwesome icon={faSave} /> Save
      </button>
      <button
        className="songeditor__button"
        onClick={() => onSave(song, true, history)}>
        <FontAwesome icon={faSave} /> Save &amp; Quit
      </button>
    </div>
    <select
      className="songeditor__select"
      defaultValue={song.scope}
      onChange={
        (event) => onChange("scope", song, event.target.value)
      }
    >
      <option value="PR">Private</option>
      <option value="FR">Friends</option>
      <option value="PU">Public</option>
    </select>
    <div className="songeditor__keychange">
      <button
        className="songeditor__keychange-btn"
        onClick={() => onModulate(song, "#", "desc")}
      >-</button>
      Key
      <button
        className="songeditor__keychange-btn"
        onClick={() => onModulate(song, "#", "asc")}
      >+</button>
    </div>
    <TextInput
      name="title"
      song={song}
      onChange={onChange}
      placeholder="Title"
    />
    <TextInput
      name="artist"
      song={song}
      onChange={onChange}
      placeholder="Artist"
    />
    <TextAreaInput
      name="content"
      song={song}
      onChange={onChange}
    />
  </div>
  );
}

const SongEditor = (props) => {
  const {
    song, fetching, onCancel, onSave, onChange, onModulate, history
  } = props;
  return (
    <div className="songeditor">
      { !fetching &&
      <InputPane
        song={song}
        onCancel={onCancel}
        onSave={onSave}
        onModulate={onModulate}
        onChange={onChange}
        history={history}
      />
      }
      <div className="songeditor__output">
        <Song
          title={song.title}
          artist={song.artist}
          content={song.parsedContent}
          fetching={fetching}
        />
      </div>
    </div>
  );
}

export default SongEditor;