// Third party
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Actions
import { getSong, setSong } from '../song/SongActions';
import { updateSong, modulateContent } from '../song-editor/SongEditorActions';

// Components
import SongEditor from './SongEditor';


class SongEditorContainer extends React.Component {

  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
  }

  componentWillMount() {
    this.props.getSong(this.props.sId, this.props.history);
  }

  render() {
    return (
      <SongEditor
        song={this.props.song}
        onCancel={this.onCancel}
        onSave={this.props.onSave}
        onModulate={this.props.onModulate}
        onChange={this.props.onChange}
        fetching={this.props.fetching}
        history={this.props.history}
      />
    );
  }

  onCancel() {
    if (window.confirm("Are you sure?")) {
      this.props.history.push("/songs/" + this.props.song.id);
    }
  }
}

function mapStateToProps(state) {
  return {
    song: state.song.song,
    fetching: state.song.fetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSong: (sId, history) => {
      dispatch(getSong(sId, history));
    },
    setSong: (sId) => {
      dispatch(setSong(sId));
    },
    onChange: (toChange, song, value) => {
      const newSong = { ...song };
      newSong[toChange] = value;
      dispatch(setSong(newSong));
    },
    onModulate: (song, mode, dir) => {
      const newContent = modulateContent(song.content, mode, dir);
      const newSong = { ...song };
      newSong['content'] = newContent;
      dispatch(setSong(newSong));
    },
    onSave: (song, quit, history) => {
      const data = {
        scope: song.scope,
        title: song.title,
        artist: song.artist,
        content: song.content
      }
      dispatch(updateSong(song.id, data));
      if (quit) {
        history.push('/songs/' + song.id);
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SongEditorContainer));