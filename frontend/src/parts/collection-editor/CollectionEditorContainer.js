// Third party
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Actions
import { getCollection, cancelFetchCollection } from '../collection/CollectionActions';
import { getSongs, cancelFetchSongs } from '../song-list/SongListActions';
import { addSongToCollection, remSongFromCollection } from './CollectionEditorActions';

// Components
import CollectionEditor from './CollectionEditor';


class CollectionEditorContainer extends React.Component {

  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
    this.onAddRemove = this.onAddRemove.bind(this);
  }

  componentWillMount() {
    this.props.getCollection(this.props.cId, this.props.history);
    this.props.getAllSongs(this.props.user.user_id);
  }

  componentWillUnmount() {
    if (this.props.fetchingSongs && this.props.fetchCancelerSongs) {
      this.props.fetchCancelerSongs.cancel();
      this.props.cancelFetchSongs();
    }
    if (this.props.fetching && this.props.fetchCanceler) {
      this.props.fetchCanceler.cancel();
      this.props.cancelFetchCollection();
    }
  }

  onCancel() {
    if (window.confirm("Are you sure?")) {
      this.props.history.push("/collections/" + this.props.collection.id);
    }
  }

  onAddRemove(action, sId, cId) {
    const uId = this.props.user.user_id;
    if (action === "add") {
      this.props.addSongToCollection(sId, cId, uId);
    } else if (action === "remove") {
      this.props.remSongFromCollection(sId, cId, uId);
    }
  }

  render() {
    return (
      <div className="editpage">
        <CollectionEditor
          collection={this.props.collection}
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
    collection: state.collection.collection,
    songs: state.songList.songs,
    fetchingSongs: state.songList.fetching,
    fetchCancelerSongs: state.songList.fetchCanceler,
    fetching: state.collection.fetching,
    fetchCanceler: state.collection.fetchCanceler
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCollection: (cId, history) => {
      dispatch(getCollection(cId, history));
    },
    getAllSongs: (uId) => {
      dispatch(getSongs(uId));
    },
    cancelFetchSongs: () => {
      dispatch(cancelFetchSongs());
    },
    cancelFetchCollection: () => {
      dispatch(cancelFetchCollection());
    },
    addSongToCollection: (sId, cId, uId) => {
      dispatch(addSongToCollection(sId, cId, uId));
    },
    remSongFromCollection: (sId, cId, uId) => {
      dispatch(remSongFromCollection(sId, cId, uId));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CollectionEditorContainer));