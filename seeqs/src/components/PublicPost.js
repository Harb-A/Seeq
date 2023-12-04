import React from "react";
import "../styles/PublicPost.css";

const PublicPost = ({ title, position, importantSkills, description }) => {
  const toggleHidden = () => {
    console.log("Post hidden");
  };

  return (
    <div className="public-post">
      <div className="post-header">
        <h3>{title}</h3>
        <p>{position}</p>
      </div>
      <p>{description}</p>
      <div className="important-skills">{importantSkills}</div>
      <div className="public-post-buttons">
        <button onClick={toggleHidden} className="public-post-hide-button">
          Hide
        </button>
        <button className="public-post-delete-button">Delete</button>
      </div>
    </div>
  );
};

export default PublicPost;
