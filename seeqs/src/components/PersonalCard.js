import React from "react";
import "../styles/PersonalCard.css";

const PersonalCard = ({ title, description, isHidden }) => {
  const hideButtonText = isHidden ? "Show" : "Hide";
  return (
    <div className="personal-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="personal-card-buttons">
        <button>{hideButtonText}</button>
        <button>Delete</button>
        <button>Update</button>
      </div>
    </div>
  );
};

export default PersonalCard;
