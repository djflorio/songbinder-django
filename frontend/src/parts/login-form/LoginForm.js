// Third party
import React from 'react';
import PropTypes from 'prop-types';

// Components
import FormTextField from '../form-text-field/FormTextField';

// Assets
import './LoginForm.css';
import Spinner from '../spinner/Spinner';


const LoginForm = (props) => (
  <form className="login__form" onSubmit={props.onSubmit}>
    <FormTextField
      type="text"
      name="username"
      placeholder="username or email"
      value={props.username}
      error={props.errors.username}
      onChange={props.onChange}
    />
    <FormTextField
      type="password"
      name="password"
      placeholder="password"
      value={props.password}
      error={props.errors.password}
      onChange={props.onChange}
    />
    <button
      hidden={props.loggingIn}
      type="submit"
      className="signup__submit"
      disabled={props.loggingIn}>
      Log In
    </button>
    <Spinner visible={props.loggingIn} />
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  loggingIn: PropTypes.bool.isRequired
}

export default LoginForm;