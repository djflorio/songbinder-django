import * as actions from './AuthActions';
import isEmpty from 'lodash/isEmpty';

export const defaultState = {
  isAuthenticated: false,
  user: {},
  loginErrors: {},
  signupErrors: {},
  loggingIn: false,
  signingUp: false
}

export default (state=defaultState, action) => {
  switch(action.type) {
    case actions.START_LOGIN: {
      return {
        ...state,
        loggingIn: true
      }
    }
    case actions.SUCCEED_LOGIN:
    case actions.FAIL_LOGIN: {
      return {
        ...state,
        loggingIn: false
      }
    }
    case actions.UPDATE_LOGIN_ERRORS: {
      return {
        ...state,
        loginErrors: action.errors
      }
    }
    case actions.SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }
    }
    case actions.START_SIGNUP: {
      return {
        ...state,
        signingUp: true
      }
    }
    case actions.SUCCEED_SIGNUP:
    case actions.FAIL_SIGNUP: {
      return {
        ...state,
        signingUp: false
      }
    }
    case actions.UPDATE_SIGNUP_ERRORS: {
      return {
        ...state,
        signupErrors: action.errors
      }
    }
    default: return state;
  }
}