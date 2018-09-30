// Third party
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';

// Assets
import './SideBar.css';


const SideBarLink = (props) => {

  const { path, text, icon } = props;

  return (
    <NavLink
      exact to={path}
      className="sidebar__link"
      activeClassName="sidebar__link--active">
      {text}
      <span className="sidebar__icon-container">
        <FontAwesome className="sidebar__icon" icon={icon} />
      </span>
    </NavLink>
  );
}

const SideBar = (props) => {
  return (
    <div className="sidebar">
      <h1 className="sidebar__brand">
        songbinder<span className="sidebar__version">alpha</span>
      </h1>
      <div className="sidebar__nav">
        <SideBarLink
          path="/dashboard"
          text="Dashboard"
          icon={['fas', 'object-group']}
        />
        <SideBarLink
          path="/dashboard/songs"
          text="Songs"
          icon={['fas', 'music']}
        />
        <SideBarLink
          path="/dashboard/binders"
          text="Binders"
          icon={['fas', 'book']}
        />
        <a onClick={props.logoutClick} className="sidebar__link">
          Logout
          <span className="sidebar__icon-container">
            <FontAwesome
              className="sidebar__icon"
              icon={['fas', 'sign-out-alt']}
            />
          </span>
        </a>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  logoutClick: PropTypes.func.isRequired
}

export default SideBar;