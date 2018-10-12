// Third party
import React from "react";
import { connect } from "react-redux";
import FontAwesome from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

// Assets
import "./HomePanel.css";

const HomePanel = props => (
  <div className="home-panel">
    <h1 className="home-panel__user">{props.user.username}</h1>
    <div className="home-panel__block home-panel__block--songs">
      <div className="home-panel__block-overlay" />
      <FontAwesome className="home-panel__block-icon" icon={["fas", "music"]} />
      <div className="home-panel__block-text">12 Songs</div>
      <Link className="home-panel__block-link" to="/dashboard/songs">
        View Songs
      </Link>
    </div>
    <div className="home-panel__block home-panel__block--binders">
      <div className="home-panel__block-overlay" />
      <FontAwesome className="home-panel__block-icon" icon={["fas", "book"]} />
      <div className="home-panel__block-text">3 Binders</div>
      <Link className="home-panel__block-link" to="/dashboard/binders">
        View Binders
      </Link>
    </div>
  </div>
);

class HomePanelContainer extends React.Component {
  render() {
    return <HomePanel user={this.props.user} />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(
  mapStateToProps,
  null
)(HomePanelContainer);
