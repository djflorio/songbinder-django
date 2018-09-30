// Third party
import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';

// Assets
import faBook from '@fortawesome/fontawesome-free-solid/faBook';
import faMusic from '@fortawesome/fontawesome-free-solid/faMusic';


const HomePanel = () => (
  <div className="dashboard-home">
    <div className="dashboard-home__panel">
      <FontAwesome icon={faMusic} />
      12 Songs
    </div>
    <div className="dashboard-home__panel">
      <FontAwesome icon={faBook} />
      3 Binders
    </div>
  </div>
);

export default HomePanel;