import React from "react";
import "../styles/PublicPost.css";

const PublicPost = ({ post }) => {
  const toggleHidden = async () => {
    try {
      const postId = post._id;
      const authToken = localStorage.getItem("accessToken");

      const response = await fetch(
        `http://localhost:4000/posts/hiding/${postId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Post status updated to shown");
      } else {
        console.error("Error updating post status");
      }
    } catch (error) {
      console.error("Error updating post status:", error);
    }
  };

  const deletePost = async () => {
    try {
      const postId = post._id;
      const authToken = localStorage.getItem("accessToken");

      const response = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Post deleted");
      } else {
        console.error("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
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
        <button onClick={deletePost} className="public-post-delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default PublicPost;
