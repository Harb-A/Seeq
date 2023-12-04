import React from "react";
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Not Found</h1>
      <p className="not-found-text">
        The page you are looking for might be in another universe.
      </p>
      {/* You can add additional elements or styles as needed */}
    </div>
  );
};

export default NotFound;
