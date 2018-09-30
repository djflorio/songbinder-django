// Third party
import React from 'react';
import { Route } from 'react-router-dom';

// Assets
import './DashboardPage.css';

// Components
import SideBar from '../../parts/side-bar/SideBarContainer';
import HomePanel from './HomePanel';
import SongsPanel from './SongsPanel';
import BindersPanel from './BindersPanel';


class DashboardPage extends React.Component {
  render() {
    return (
      <div className="dashboard-page">
        <SideBar location={this.props.location} />
        <div className="dashboard-page__right">
          <Route exact path="/dashboard" component={HomePanel} />
          <Route exact path="/dashboard/songs" component={SongsPanel} />
          <Route exact path="/dashboard/binders" component={BindersPanel} />
        </div>
      </div>
    );
  }
}

export default DashboardPage;