// Third party
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Actions
import { getBinder, cancelFetchBinder } from './BinderActions';

// Components
import Binder from './Binder';


class BinderContainer extends React.Component {

  componentWillMount() {
    this.props.getBinder(this.props.cId, this.props.history);
  }

  componentWillUnmount() {
    if (this.props.fetching && this.props.fetchCanceler) {
      this.props.fetchCanceler.cancel();
      this.props.cancelFetchSong();
    }
  }

  render() {
    return (
      <Binder
        binder={this.props.binder}
        fetching={this.props.fetching}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    binder: state.binder.binder,
    fetching: state.binder.fetching,
    fetchCanceler: state.binder.fetchCanceler
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBinder: (cId, history) => {
      dispatch(getBinder(cId, history));
    },
    cancelFetchBinder: () => {
      dispatch(cancelFetchBinder());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BinderContainer));