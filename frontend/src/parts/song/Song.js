// Third party
import React from "react";
import PropTypes from "prop-types";

// Assets
import "./Song.css";

// Components
import { DualRingLoader } from "../loaders/Loaders";

const Song = ({ title, artist, content, fetching }) => {
  if (fetching) {
    return (
      <div className="song__loader">
        <span className="song__loader-text">Loading song...</span>
        <DualRingLoader />
      </div>
    );
  } else {
    return (
      <div className="song">
        <h3 className="song__title">{title}</h3>
        <h4 className="song__artist">{artist}</h4>
        {content.map((line, i) => {
          return (
            <div key={i} className="song__line">
              {line.map((chunk, j) => {
                return (
                  <span key={j} className="song__chunk">
                    <span className="song__chord">
                      {chunk.chord === "" ? " " : chunk.chord}
                    </span>
                    <span className="song__lyric">
                      {chunk.lyric === "" ? " " : chunk.lyric}
                    </span>
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
};

Song.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  fetching: PropTypes.bool
};

export default Song;
