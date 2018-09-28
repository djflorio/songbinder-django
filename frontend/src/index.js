// Third party
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

// Assets
import './index.css';
import rootReducer from './reducers';

// Components
import App from './App';

// Actions
import {
  setCurrentUser, setAuthorizationToken
} from './parts/auth/AuthActions';


const store = createStore(
  rootReducer,
  applyMiddleware(thunk, reduxLogger)
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
