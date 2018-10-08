// Third party
import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from '@fortawesome/react-fontawesome';

// Assets
import './HomePanel.css';


const Panel = (props) => {
  const { num, text, icon } = props;
  return (
    <div className="panel">
      <FontAwesome
        className="panel__icon"
        icon={icon}
      />
      <div className="panel__text">
        {num} {text}
      </div>
    </div>
  );
}

const HomePanel = (props) => (
  <div className="home-panel">
    <h1 className="home-panel__user" >{props.user.username}</h1>
    <div className="home-panel__block home-panel__block--songs">
      <div className="home-panel__block-overlay"></div>
      <FontAwesome
        className="home-panel__block-icon"
        icon={['fas', 'music']}
      />
      <div className="home-panel__block-text">
        12 Songs
      </div>
    </div>
    <div className="home-panel__block home-panel__block--binders">
    <div className="home-panel__block-overlay"></div>
      <FontAwesome
        className="home-panel__block-icon"
        icon={['fas', 'book']}
      />
      <div className="home-panel__block-text">
        3 Binders
      </div>
    </div>
  </div>
);

class HomePanelContainer extends React.Component {
  render() {
    return (
      <HomePanel user={this.props.user} />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(
  mapStateToProps,
  null
)(HomePanelContainer);