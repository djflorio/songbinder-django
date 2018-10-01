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
      <div className="panel__inner">
        <FontAwesome
          className="panel__icon"
          icon={icon}
        />
        <div className="panel__text">
          {num} {text}
        </div>
      </div>
    </div>
  );
}

const HomePanel = () => (
  <div className="dashboard-home">
    <Panel
      num={12}
      text="Songs"
      icon={['fas', 'music']}
    />
    <Panel
      num={3}
      text="Binders"
      icon={['fas', 'book']}
    />
  </div>
);

class HomePanelContainer extends React.Component {
  render() {
    return (
      <HomePanel />
    );
  }
}

export default HomePanelContainer;