// Third party
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import LoginForm from './LoginForm';

// Actions
import {
  validateLoginInput, updateLoginErrors, loginRequest
} from '../auth/AuthActions';


class LoginFormContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.updateLoginErrors({});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = validateLoginInput(this.state);

    if (!isValid) {
      this.props.updateLoginErrors(errors);
    } else {
      this.props.loginRequest(this.state, this.props.history);
    }
  }

  render() {
    return (
      <LoginForm
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        username={this.state.username}
        password={this.state.password}
        errors={this.props.errors}
        loggingIn={this.props.loggingIn}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.auth.loginErrors,
    loggingIn: state.auth.loggingIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginRequest: (data, history) => {
      dispatch(loginRequest(data, history));
    },
    updateLoginErrors: (errors) => {
      dispatch(updateLoginErrors(errors));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginFormContainer));