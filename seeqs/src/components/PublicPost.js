import React from "react";
import "../styles/PublicPost.css";

const PublicPost = ({ post }) => {
  const toggleHidden = () => {
    console.log("Post hidden");
  };

  return (
    <div className="public-post">
      <div className="post-header">
        <h3>{post.title}</h3>
        <p>{post.position}</p>
      </div>
      <p>{post.description}</p>
      <div className="important-skills">{post.skills.join(", ")}</div>
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
