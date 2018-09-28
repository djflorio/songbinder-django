// Third party
import React from 'react';

// Components
import CollectionEditor from '../parts/collection-editor/CollectionEditorContainer';
import TopBar from '../parts/top-bar/TopBar';


const CollectionEditPage = (props) => (
  <div>
    <TopBar />
    <CollectionEditor
      cId={props.match.params.cId}
    />
  </div>
);

export default CollectionEditPage;