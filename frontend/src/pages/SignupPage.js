// Third party
import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

// Assets
import './SignupPage.css';

// Components
import SignupForm from '../parts/signup-form/SignupFormContainer';


const SignupPage = () => (
  <div className="signup">
    <div className="signup__container">
      <div className="signup__nav">
        <Link className="signup__back" to="/">
          <FontAwesome icon={['fas', 'angle-double-left']} />&nbsp;
          Back
        </Link>
      </div>
      <SignupForm />
    </div>
  </div>
);

export default SignupPage;