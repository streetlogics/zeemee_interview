import React from "react";
import SpinnerIcon from "../images/spinner.svg";

const Loading = ({ searching = false }) => {
  return (
    <div className="loading-container">
      <img src={SpinnerIcon} alt="Loading..." className="spinner" />
      <div className="loading-text">
        {searching ? "Searching..." : "Loading..."}
      </div>
    </div>
  );
};

export default Loading;
