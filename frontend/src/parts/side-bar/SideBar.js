// Third party
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';

// Assets
import './SideBar.css';
import faObjectGroup from '@fortawesome/fontawesome-free-solid/faObjectGroup';
import faBook from '@fortawesome/fontawesome-free-solid/faBook';
import faMusic from '@fortawesome/fontawesome-free-solid/faMusic';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';


const SideBar = (props) => {
  return (
    <div className="sidebar">
      <h1 className="sidebar__brand">
        songbinder<span className="sidebar__version">alpha</span>
      </h1>
      <div className="sidebar__nav">
        <NavLink exact to="/dashboard" className="sidebar__link" activeClassName="sidebar__link--active">
          Dashboard
          <span className="sidebar__icon-container">
            <FontAwesome className="sidebar__icon" icon={faObjectGroup} />
          </span>
        </NavLink>
        <NavLink to="/dashboard/songs" className="sidebar__link" activeClassName="sidebar__link--active">
          Songs
          <span className="sidebar__icon-container">
            <FontAwesome className="sidebar__icon" icon={faMusic} />
          </span>
        </NavLink>
        <NavLink to="/dashboard/binders" className="sidebar__link" activeClassName="sidebar__link--active">
          Binders
          <span className="sidebar__icon-container">
            <FontAwesome className="sidebar__icon" icon={faBook} />
          </span>
        </NavLink>
        <a onClick={props.logoutClick} className="sidebar__link">
          Logout
          <span className="sidebar__icon-container">
            <FontAwesome className="sidebar__icon" icon={faSignOutAlt} />
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