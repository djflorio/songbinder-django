// Third party
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Assets
import './HomePage.css';


class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      heroHeight: window.innerHeight
    }
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/binder');
    }
  }

  render() {
    return (
      <div className="home">
        <div className="home__hero" style={{ height: this.state.heroHeight }}>
          <div className="home__hero-overlay"></div>
          <div className="home__center">
            <h1 className="home__title">songbinder<span className="home__version">alpha</span></h1>
            
            <Link to="/signup">
              <span className="home__button home__button--start">
                Sign Up Free
              </span>
            </Link>
            <p className="home__login-text">
              Already have an account?&nbsp;
              <Link to="/login" className="home__login-link">Login</Link>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(
  mapStateToProps,
  null
)(HomePage);