// Third party
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';

// Assets
import './IconButton.css';


const IconButton = (props) => (
  <button className="icon-button" onClick={props.onClick}>
    <FontAwesome icon={props.icon} className="icon-button__icon" />
    {props.text}
  </button>
);

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
}

export default IconButton;