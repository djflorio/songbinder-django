// Third party
import React from 'react';

// Assets
import './SongPage.css';

// Components
import TopBar from '../parts/top-bar/TopBar';
import Song from '../parts/song/SongContainer';


const SongPage = (props) => (
  <div className="songpage">
    <TopBar sId={props.match.params.sId} />
    <div className="songpage__content">
      <Song sId={props.match.params.sId} />
    </div>
  </div>
);

export default SongPage;