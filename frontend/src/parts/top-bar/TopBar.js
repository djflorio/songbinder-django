// Third party
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FontAwesome from "@fortawesome/react-fontawesome";

// Assets
import "./TopBar.css";

const TopBar = ({ sId }) => {
  const onPrintClick = () => {
    window.print();
  };

  return (
    <div className="topbar">
      <Link className="topbar__back" to="/dashboard">
        <FontAwesome
          className="topbar__back-arrow"
          icon={["fas", "angle-double-left"]}
        />
        back to binder
      </Link>

      {sId && (
        <div className="topbar__right-controls">
          <Link className="topbar__control" to={"/songs/edit/" + sId}>
            edit
          </Link>
          <span className="topbar__control" onClick={onPrintClick}>
            <FontAwesome icon={["fas", "print"]} /> print
          </span>
        </div>
      )}
    </div>
  );
};

TopBar.propTypes = {
  sId: PropTypes.string
};

export default TopBar;
