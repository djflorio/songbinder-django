// Third party
import React from 'react';
import { Route } from 'react-router-dom';

// Assets
import './DashboardPage.css';

// Components
import SideBar from '../parts/side-bar/SideBarContainer';
import DashboardHomePage from './DashboardHomePage';
import DashboardSongsPage from './DashboardSongsPage';
import DashboardBindersPage from './DashboardBindersPage';


class DashboardPage extends React.Component {
  render() {
    return (
      <div className="dashboard-page">
        <SideBar location={this.props.location} />
        <div className="dashboard-page__right">
          <Route exact path="/dashbaord" component={DashboardHomePage} />
          <Route exact path="/dashboard/songs" component={DashboardSongsPage} />
          <Route exact path="/dashboard/binders" component={DashboardBindersPage} />
        </div>
      </div>
    );
  }
}

export default DashboardPage;