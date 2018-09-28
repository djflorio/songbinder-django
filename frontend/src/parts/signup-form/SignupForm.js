// Third party
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import './SignupForm.css';

// Components
import FormTextField from '../form-text-field/FormTextField';
import Spinner from '../spinner/Spinner';


const SignupForm = (props) => (
  <form className="signup__form" onSubmit={props.onSubmit}>
    <FormTextField
      type="text"
      name="username"
      placeholder="username"
      value={props.username}
      onChange={props.onChange}
      error={props.errors.username}
    />
    <FormTextField
      type="text"
      name="email"
      placeholder="email"
      value={props.email}
      onChange={props.onChange}
      error={props.errors.email}
    />
    <FormTextField
      type="password"
      name="password"
      placeholder="password"
      value={props.password}
      onChange={props.onChange}
      error={props.errors.password}
    />
    <FormTextField
      type="password"
      name="passwordConfirmation"
      placeholder="confirm password"
      value={props.passwordConfirmation}
      onChange={props.onChange}
      error={props.errors.passwordConfirmation}
    />
    <button
      hidden={props.signingUp}
      className="signup__submit"
      type="submit"
      disabled={props.signingUp}>
      { props.signingUp ? "Please wait..." : "Sign Up" }
    </button>
    <Spinner visible={props.signingUp} />
  </form>
);

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  signingUp: PropTypes.bool.isRequired
}

export default SignupForm;