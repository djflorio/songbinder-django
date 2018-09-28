// Third party
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt from 'jsonwebtoken';

// Actions
import { logout } from './AuthActions';


// HOC that requires authentication to view the child component.
export default function(ComposedComponent, requireAdmin=false) {
  class Authenticate extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        loginCheck: false
      }

      this.redirect = this.redirect.bind(this);
    }

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.redirect('/login');
      } else {
        const data = {
          token: localStorage.getItem('jwtToken')
        }
        if (requireAdmin && !jwt.decode(data.token).is_staff) {
          this.redirect('/dashboard');
          return;
        }
        axios.post('/api/token/verify', data)
          .then(() => {
            this.setState({
              loginCheck: true
            });
          })
          .catch(() => {
            this.props.logout();
            this.redirect('/login');
          });
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.redirect('/');
      }
    }

    redirect(url) {
      this.props.history.push(url);
    }

    render() {
      if (this.state.loginCheck) {
        return (
          <ComposedComponent { ...this.props } />
        );
      }
      else {
        return null;
      }
    }

  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      logout: () => {
        dispatch(logout());
      }
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate);
}