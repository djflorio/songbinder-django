// Third party
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';

// Assets
import './TopBar.css';
import faAngleDoubleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft';
import faPrint from '@fortawesome/fontawesome-free-solid/faPrint';


const TopBar = ({sId}) => {
  return (
    <div className="topbar">

      <Link className="topbar__back" to="/binder">
        <FontAwesome className="topbar__back-arrow" icon={faAngleDoubleLeft} />
        back to binder
      </Link>
    
      {
        sId &&
        <div className="topbar__right-controls">
          <Link className="topbar__control" to={"/songs/edit/" + sId}>
            edit
          </Link>
          <a
            className="topbar__control"
            href="javascript:window.print()">
            <FontAwesome icon={faPrint} /> print
          </a>
        </div>
      }
      
    </div>
  );
}

TopBar.propTypes = {
  sId: PropTypes.string
}

export default TopBar;