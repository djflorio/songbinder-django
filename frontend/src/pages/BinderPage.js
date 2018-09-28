// Third party
import React from 'react';
import { Route } from 'react-router-dom';

// Assets
import './BinderPage.css';

// Components
import SideBar from '../parts/side-bar/SideBarContainer';
import BinderSongsPage from './BinderSongsPage';
import BinderCollectionsPage from './BinderCollectionsPage';


class BinderPage extends React.Component {
  render() {
    return (
      <div className="binder-page">
        <SideBar location={this.props.location} />
        <div className="binder-page__right">
          <Route exact path="/binder/songs" component={BinderSongsPage} />
          <Route exact path="/binder/collections" component={BinderCollectionsPage} />
        </div>
      </div>
    );
  }
}

export default BinderPage;