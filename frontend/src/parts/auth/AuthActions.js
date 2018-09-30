import axios from 'axios';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';

export const START_LOGIN = 'START_LOGIN';
export const SUCCEED_LOGIN = 'SUCCEED_LOGIN';
export const FAIL_LOGIN = 'FAIL_LOGIN';
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_LOGIN_ERRORS = 'UPDATE_LOGIN_ERRORS';
export const UPDATE_SIGNUP_ERRORS = 'UPDATE_SIGNUP_ERRORS';
export const START_SIGNUP = 'START_SIGNUP';
export const SUCCEED_SIGNUP = 'SUCCEED_SIGNUP';
export const FAIL_SIGNUP = 'FAIL_SIGNUP';

export const startLogin = () => ({
  type: START_LOGIN
});

export const succeedLogin = () => ({
  type: SUCCEED_LOGIN
});

export const failLogin = () => ({
  type: FAIL_LOGIN
});

export const startSignup = () => ({
  type: START_SIGNUP
});

export const succeedSignup = () => ({
  type: SUCCEED_SIGNUP
});

export const failSignup = () => ({
  type: FAIL_SIGNUP
});

export const updateLoginErrors = (errors) => ({
  type: UPDATE_LOGIN_ERRORS,
  errors
});

export const updateSignupErrors = (errors) => ({
  type: UPDATE_SIGNUP_ERRORS,
  errors
});

export const validateLoginInput = (data) => {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const validateSignupInput = (data) => {
  let errors = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  } else {
    if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user: user
  }
}

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export const loginRequest = (formData, history) => {
  return dispatch => {
    let errors = {};

    dispatch(startLogin());
    dispatch(updateLoginErrors(errors));
    
    axios.post('/api/token/', formData)
    .then(res => {
      dispatch(succeedLogin());
      const token = res.data.access;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch(failLogin());

      errors = {
        username: "Username or password incorrect.",
        password: "Username or password incorrect."
      };
      
      dispatch(updateLoginErrors(errors));
    });
  }
}

export const signupRequest = (formData, history) => {
  return dispatch => {
    let errors = {};

    dispatch(startSignup());
    dispatch(updateSignupErrors(errors));

    // If a token is sent with the signup request, it will
    // cause an error. To avoid this, we ensure there's no
    // authorization header in the axios request.
    delete axios.defaults.headers.common['Authorization'];

    axios.post('/api/users/new/', formData)
    .then(res => {
      dispatch(succeedSignup());
      history.push('/register-success');
    })
    .catch(err => {
      dispatch(failSignup());
      const usernameError = err.response.data.username;
      const emailError = err.response.data.email;
      if (usernameError && usernameError[0] === "This field must be unique.") {
        errors = {
          ...errors,
          username: "Username taken."
        };
      }
      if (emailError && emailError[0] === "This field must be unique.") {
        errors = {
          ...errors,
          email: "Email taken."
        };
      }
      dispatch(updateSignupErrors(errors));
    });
  }
}