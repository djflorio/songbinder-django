// Third party
import React from 'react';

// Assets
import './BinderPage.css';

// Components
import TopBar from '../parts/top-bar/TopBar';
import Binder from '../parts/binder/BinderContainer';


const BinderPage = (props) => (
  <div className="binder-page">
    <TopBar sId={props.match.params.cId} />
    <div className="songpage__content">
      <Binder cId={props.match.params.cId} />
    </div>
  </div>
);

export default BinderPage;