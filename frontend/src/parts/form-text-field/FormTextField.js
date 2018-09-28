// Third party
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Assets
import './FormTextField.css';


const FormTextField = (props) => {
  const { type, name, placeholder, value, error, onChange } = props;
  return (
    <div className="textfield">
      <input
        type={type}
        className={classnames("textfield__input", {"textfield__input--error": error})}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="textfield__error">{error}</span>}
    </div>
  );
}

FormTextField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default FormTextField;
