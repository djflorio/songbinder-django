// Third party
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Actions
import { getBinder, cancelFetchBinder } from '../binder/BinderActions';
import { getSongs, cancelFetchSongs } from '../song-list/SongListActions';
import { addSongToBinder, remSongFromBinder } from './BinderEditorActions';

// Components
import BinderEditor from './BinderEditor';


class BinderEditorContainer extends React.Component {

  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
    this.onAddRemove = this.onAddRemove.bind(this);
  }

  componentWillMount() {
    this.props.getBinder(this.props.cId, this.props.history);
    this.props.getAllSongs(this.props.user.user_id);
  }

  componentWillUnmount() {
    if (this.props.fetchingSongs && this.props.fetchCancelerSongs) {
      this.props.fetchCancelerSongs.cancel();
      this.props.cancelFetchSongs();
    }
    if (this.props.fetching && this.props.fetchCanceler) {
      this.props.fetchCanceler.cancel();
      this.props.cancelFetchBinder();
    }
  }

  onCancel() {
    if (window.confirm("Are you sure?")) {
      this.props.history.push("/binders/" + this.props.binder.id);
    }
  }

  onAddRemove(action, sId, cId) {
    const uId = this.props.user.user_id;
    if (action === "add") {
      this.props.addSongToBinder(sId, cId, uId);
    } else if (action === "remove") {
      this.props.remSongFromBinder(sId, cId, uId);
    }
  }

  render() {
    return (
      <div className="editpage">
        <BinderEditor
          binder={this.props.binder}
          songs={this.props.songs}
          onAddRemove={this.onAddRemove}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    binder: state.binder.binder,
    songs: state.songList.songs,
    fetchingSongs: state.songList.fetching,
    fetchCancelerSongs: state.songList.fetchCanceler,
    fetching: state.binder.fetching,
    fetchCanceler: state.binder.fetchCanceler
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBinder: (cId, history) => {
      dispatch(getBinder(cId, history));
    },
    getAllSongs: (uId) => {
      dispatch(getSongs(uId));
    },
    cancelFetchSongs: () => {
      dispatch(cancelFetchSongs());
    },
    cancelFetchBinder: () => {
      dispatch(cancelFetchBinder());
    },
    addSongToBinder: (sId, cId, uId) => {
      dispatch(addSongToBinder(sId, cId, uId));
    },
    remSongFromBinder: (sId, cId, uId) => {
      dispatch(remSongFromBinder(sId, cId, uId));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BinderEditorContainer));