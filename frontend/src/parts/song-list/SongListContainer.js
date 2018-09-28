// Third party
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Actions
import { getSongs, createSong, cancelFetchSongs } from './SongListActions';
import { delSong } from '../song/SongActions';

// Components
import SongList from './SongList';


class SongListContainer extends React.Component {

  componentDidMount() {
    this.props.getAllSongs(this.props.user.user_id);
  }

  componentWillUnmount() {
    if (this.props.fetching && this.props.fetchCanceler) {
      this.props.fetchCanceler.cancel();
      this.props.cancelFetchSongs();
    }
  }

  render() {
    return (
      <SongList
        songs={this.props.songs}
        createSong={() => this.props.createSong(this.props.history)}
        deleteSong={this.props.deleteSong}
        fetching={this.props.fetching}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    songs: state.songList.songs,
    fetching: state.songList.fetching,
    fetchCanceler: state.songList.fetchCanceler
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllSongs: (uId) => {
      dispatch(getSongs(uId));
    },
    createSong: (history) => {
      dispatch(createSong(history));
    },
    deleteSong: (sId, title) => {
      title = title === "" ? "Untitled" : title;
      const confirmation = window.confirm(
        "Permanently delete " + title + "?"
      );
      if (confirmation) {
        dispatch(delSong(sId));
      }
    },
    cancelFetchSongs: () => {
      dispatch(cancelFetchSongs());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SongListContainer));