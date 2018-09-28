import * as actions from './AuthActions';
import reducer, { defaultState } from './AuthReducer';

describe('Auth', () => {

  const testUser = {
    username: "testuser",
    email: "test@test.com"
  }

  const loggingInState = {
    ...defaultState,
    loggingIn: true
  };

  const signingUpState = {
    ...defaultState,
    signingUp: true
  };

  it('should create action to start login', () => {
    expect(actions.startLogin()).toEqual({
      type: actions.START_LOGIN
    });
  });

  it('should create action to succeed Login', () => {
    expect(actions.succeedLogin()).toEqual({
      type: actions.SUCCEED_LOGIN
    });
  });

  it('should create action to fail Login', () => {
    expect(actions.failLogin()).toEqual({
      type: actions.FAIL_LOGIN
    });
  });

  it('should create action to update login errors', () => {
    expect(actions.updateLoginErrors({ email: "error" })).toEqual({
      type: actions.UPDATE_LOGIN_ERRORS,
      errors: { email: "error" }
    });
  });

  it('should set loggingIn to true with startLogin', () => {
    expect(reducer(defaultState, actions.startLogin())).toEqual({
      ...defaultState,
      loggingIn: true
    });
  });

  it('should set loggingIn to false with succeedLogin', () => {
    expect(reducer(loggingInState, actions.succeedLogin())).toEqual({
      ...loggingInState,
      loggingIn: false
    });
  });

  it('should set loggingIn to false with failLogin', () => {
    expect(reducer(loggingInState, actions.failLogin())).toEqual({
      ...loggingInState,
      loggingIn: false
    });
  });

  it('should update login errors with updateLoginErrors', () => {
    const errors = {
      email: "error",
      username: "error"
    };
    expect(reducer(defaultState, actions.updateLoginErrors(errors))).toEqual({
      ...defaultState,
      loginErrors: errors
    });
  });

  it('should create an action to set current user', () => {
    expect(actions.setCurrentUser(testUser)).toEqual({
      type: actions.SET_CURRENT_USER,
      user: testUser
    });
  });

  it('should set current user', () => {
    expect(reducer(undefined, actions.setCurrentUser(testUser))).toEqual({
      ...defaultState,
      isAuthenticated: true,
      user: testUser
    });
  });

  it('should create action to start signup', () => {
    expect(actions.startSignup()).toEqual({
      type: actions.START_SIGNUP
    });
  });

  it('should create action to succeed signup', () => {
    expect(actions.succeedSignup()).toEqual({
      type: actions.SUCCEED_SIGNUP
    });
  });

  it('should create action to fail signup', () => {
    expect(actions.failSignup()).toEqual({
      type: actions.FAIL_SIGNUP
    });
  });

  it('should create action to update signup errors', () => {
    expect(actions.updateSignupErrors({ email: "error" })).toEqual({
      type: actions.UPDATE_SIGNUP_ERRORS,
      errors: { email: "error" }
    });
  });

  it('should set signingUp to true with startSignup', () => {
    expect(reducer(defaultState, actions.startSignup())).toEqual({
      ...defaultState,
      signingUp: true
    });
  });

  it('should set signingUp to false with succeedSignup', () => {
    expect(reducer(signingUpState, actions.succeedSignup())).toEqual({
      ...signingUpState,
      signingUp: false
    });
  });

  it('should set signingUp to false with failSignup', () => {
    expect(reducer(signingUpState, actions.failSignup())).toEqual({
      ...signingUpState,
      signingUp: false
    });
  });

  it('should update errors with updateSignupErrors', () => {
    const errors = {
      email: "error",
      username: "error"
    };
    expect(reducer(defaultState, actions.updateSignupErrors(errors))).toEqual({
      ...defaultState,
      signupErrors: errors
    });
  });

  it('should return state with unexpected action', () => {
    expect(reducer(undefined, { type: "unexpected" })).toEqual(
      defaultState
    );
  })

});

describe('validateLoginInput', () => {

  const testData = {
    username: "test",
    password: "password"
  }

  it('should enforce required username', () => {
    const noUsername = {
      ...testData,
      username: ""
    }
    const test = actions.validateLoginInput(noUsername);
    expect(test).toEqual({
      errors: { username: 'Username is required' },
      isValid: false
    });
  });

  it('should enforce required password', () => {
    const noPassword = {
      ...testData,
      password: ""
    }
    const test = actions.validateLoginInput(noPassword);
    expect(test).toEqual({
      errors: expect.objectContaining({ password: 'Password is required' }),
      isValid: false
    });
  });

});

describe('validateSignupInput', () => {

  const testData = {
    email: "test@test.com",
    username: "test",
    password: "password",
    passwordConfirmation: "password"
  }

  it('should enforce valid email', () => {
    const invalidEmail = {
      ...testData,
      email: "invalid"
    }
    const test = actions.validateSignupInput(invalidEmail);
    expect(test).toEqual({
      errors: { email: 'Email is invalid' },
      isValid: false
    });
  });

  it('should enforce required username', () => {
    const noUsername = {
      ...testData,
      username: ""
    }
    const test = actions.validateSignupInput(noUsername);
    expect(test).toEqual({
      errors: { username: 'Username is required' },
      isValid: false
    });
  });

  it('should enforce required password', () => {
    const noPassword = {
      ...testData,
      password: ""
    }
    const test = actions.validateSignupInput(noPassword);
    expect(test).toEqual({
      errors: expect.objectContaining({ password: 'Password is required' }),
      isValid: false
    });
  });

  it('should enforce required password length', () => {
    const shortPassword = {
      ...testData,
      password: "short"
    }
    const test = actions.validateSignupInput(shortPassword);
    expect(test).toEqual({
      errors: expect.objectContaining({ password: 'Password must be at least 8 characters' }),
      isValid: false
    });
  });

  it('should enforce matching passwords', () => {
    const passwordMismatch = {
      ...testData,
      password: "password1",
      passwordConfirmation: "password2"
    }
    const test = actions.validateSignupInput(passwordMismatch);
    expect(test).toEqual({
      errors: { passwordConfirmation: 'Passwords must match' },
      isValid: false
    });
  });

});