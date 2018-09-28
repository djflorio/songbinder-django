// Third party
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Actions
import { getSong, cancelFetchSong } from './SongActions';

// Components
import Song from './Song';


class SongContainer extends React.Component {

  componentWillMount() {
    this.props.getSong(this.props.sId, this.props.history);
  }

  componentWillUnmount() {
    if (this.props.fetching && this.props.fetchCanceler) {
      this.props.fetchCanceler.cancel();
      this.props.cancelFetchSong();
    }
  }

  render() {
    return (
      <Song
        title={this.props.song.title}
        artist={this.props.song.artist}
        content={this.props.song.parsedContent}
        fetching={this.props.fetching}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    song: state.song.song,
    fetching: state.song.fetching,
    fetchCanceler: state.song.fetchCanceler
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSong: (sId, history) => {
      dispatch(getSong(sId, history));
    },
    cancelFetchSong: () => {
      dispatch(cancelFetchSong());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SongContainer));