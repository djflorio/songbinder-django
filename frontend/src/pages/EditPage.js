// Third party
import React from 'react';

// Components
import SongEditor from '../parts/song-editor/SongEditorContainer';


const EditPage = (props) => (
  <div>
    <SongEditor
      sId={props.match.params.sId}
    />
  </div>
);

export default EditPage;