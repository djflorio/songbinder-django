// Third party
import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from '@fortawesome/react-fontawesome';

// Assets
import faAngleDoubleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft';
import './LoginPage.css';

// Components
import LoginForm from '../parts/login-form/LoginFormContainer';


const LoginPage = () => (
  <div className="login">
    <div className="login__container">
      <div className="login__nav">
        <Link className="login__back" to="/">
          <FontAwesome icon={faAngleDoubleLeft} />&nbsp;
          Back
        </Link>
      </div>
      <LoginForm />
    </div>
  </div>
);

export default LoginPage;