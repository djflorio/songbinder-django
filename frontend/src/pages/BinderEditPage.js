// Third party
import React from 'react';

// Components
import BinderEditor from '../parts/binder-editor/BinderEditorContainer';
import TopBar from '../parts/top-bar/TopBar';


const BinderEditPage = (props) => (
  <div>
    <TopBar />
    <BinderEditor
      cId={props.match.params.cId}
    />
  </div>
);

export default BinderEditPage;