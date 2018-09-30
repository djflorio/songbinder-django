// Third party
import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';


const HomePanel = () => (
  <div className="dashboard-home">
    <div className="dashboard-home__panel">
      <FontAwesome icon={['fas', 'music']} />
      12 Songs
    </div>
    <div className="dashboard-home__panel">
      <FontAwesome icon={['fas', 'book']} />
      3 Binders
    </div>
  </div>
);

export default HomePanel;