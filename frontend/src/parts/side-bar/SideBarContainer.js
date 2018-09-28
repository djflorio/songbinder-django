// Third party
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Actions
import { logout } from '../auth/AuthActions';

// Components
import SideBar from './SideBar';


class SideBarContainer extends React.Component {
  render() {
    return (
      <SideBar
        logoutClick={() => this.props.logoutClick(this.props.history)}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutClick: (history) => {
      history.push("/");
      dispatch(logout());
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(SideBarContainer));