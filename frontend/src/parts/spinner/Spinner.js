import React from 'react';
import './Spinner.css';

const Spinner = ({visible}) => {
  return (
    <div className="spinner" hidden={!visible}></div>
  );
}

export default Spinner;