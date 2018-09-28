// Third party
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import SignupForm from './SignupForm';

// Actions
import {
  validateSignupInput, updateSignupErrors, signupRequest
} from '../auth/AuthActions';


class SignupFormContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.updateSignupErrors({});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { errors, isValid } = validateSignupInput(this.state);

    if (!isValid) {
      this.props.updateSignupErrors(errors);
    } else {
      this.props.signupRequest(this.state, this.props.history);
    }
  }

  render() {
    return (
      <SignupForm
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        username={this.state.username}
        email={this.state.email}
        password={this.state.password}
        passwordConfirmation={this.state.passwordConfirmation}
        errors={this.props.errors}
        signingUp={this.props.signingUp}
      />
    );
  }
  
}

function mapStateToProps(state) {
  return {
    errors: state.auth.signupErrors,
    signingUp: state.auth.signingUp
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signupRequest: (data, history) => {
      dispatch(signupRequest(data, history));
    },
    updateSignupErrors: (errors) => {
      dispatch(updateSignupErrors(errors));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignupFormContainer));