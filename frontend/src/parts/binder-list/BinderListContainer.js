// Third party
import React from 'react';
import { connect } from 'react-redux';

// Actions
import { getBinders } from './BinderListActions';
import { createBinder } from '../binder/BinderActions';

// Components
import BinderList from './BinderList';


class BinderListContainer extends React.Component {

  componentDidMount() {
    this.props.getBinders(this.props.user.user_id);
  }

  componentWillUnmount() {
    if (this.props.fetching && this.props.fetchCanceler) {
      this.props.fetchCanceler.cancel();
      this.props.cancelFetchSongs();
    }
  }

  render() {
    return (
      <BinderList
        fetching={this.props.fetching}
        binders={this.props.binders}
        createBinder={() => this.props.createBinder(this.props.history)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    fetching: state.binderList.fetching,
    fetchCanceler: state.binderList.fetchCanceler,
    binders: state.binderList.binders
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBinders: (uId) => {
      dispatch(getBinders(uId));
    },
    createBinder: (history) => {
      dispatch(createBinder(history));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BinderListContainer);