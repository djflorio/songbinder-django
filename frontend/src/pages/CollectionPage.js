// Third party
import React from 'react';

// Assets
import './CollectionPage.css';

// Components
import TopBar from '../parts/top-bar/TopBar';
import Collection from '../parts/collection/CollectionContainer';


const CollectionPage = (props) => (
  <div className="collection-page">
    <TopBar sId={props.match.params.cId} />
    <div className="songpage__content">
      <Collection cId={props.match.params.cId} />
    </div>
  </div>
);

export default CollectionPage;