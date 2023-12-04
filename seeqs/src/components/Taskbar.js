import React from "react";
import { Link } from "react-router-dom";
import "../styles/Taskbar.css";

const Taskbar = () => {
  return (
    <div className="taskbar">
      <div className="taskbar-title">Seeqs</div>
      <div className="taskbar-navigation-buttons">
        <Link to="/dashboard" className="taskbar-navigation-button">
          Dashboard
        </Link>
        <Link to="/posts" className="taskbar-navigation-button">
          Posts
        </Link>
        <Link to="/applications" className="taskbar-navigation-button">
          Applications
        </Link>
        <Link to="/profile" className="taskbar-navigation-button">
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Taskbar;
