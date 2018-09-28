// Third party
import React from 'react';
import { connect } from 'react-redux';

// Actions
import { getCollections } from './CollectionListActions';
import { createCollection } from '../collection/CollectionActions';

// Components
import CollectionList from './CollectionList';


class CollectionListContainer extends React.Component {

  componentDidMount() {
    this.props.getCollections(this.props.user.user_id);
  }

  componentWillUnmount() {
    if (this.props.fetching && this.props.fetchCanceler) {
      this.props.fetchCanceler.cancel();
      this.props.cancelFetchSongs();
    }
  }

  render() {
    return (
      <CollectionList
        fetching={this.props.fetching}
        collections={this.props.collections}
        createCollection={() => this.props.createCollection(this.props.history)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    fetching: state.collectionList.fetching,
    fetchCanceler: state.collectionList.fetchCanceler,
    collections: state.collectionList.collections
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCollections: (uId) => {
      dispatch(getCollections(uId));
    },
    createCollection: (history) => {
      dispatch(createCollection(history));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionListContainer);