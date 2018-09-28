// Third party
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Actions
import { getCollection, cancelFetchCollection } from './CollectionActions';

// Components
import Collection from './Collection';


class CollectionContainer extends React.Component {

  componentWillMount() {
    this.props.getCollection(this.props.cId, this.props.history);
  }

  componentWillUnmount() {
    if (this.props.fetching && this.props.fetchCanceler) {
      this.props.fetchCanceler.cancel();
      this.props.cancelFetchSong();
    }
  }

  render() {
    return (
      <Collection
        collection={this.props.collection}
        fetching={this.props.fetching}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    collection: state.collection.collection,
    fetching: state.collection.fetching,
    fetchCanceler: state.collection.fetchCanceler
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCollection: (cId, history) => {
      dispatch(getCollection(cId, history));
    },
    cancelFetchCollection: () => {
      dispatch(cancelFetchCollection());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CollectionContainer));