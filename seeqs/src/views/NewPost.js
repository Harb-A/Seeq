import React, { useState } from "react";
import Taskbar from "../components/Taskbar";
import "../styles/NewPost.css";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New post data:", {
      title,
      position,
      experience,
      skills,
      body,
    });
  };

  return (
    <div>
      <Taskbar />

      <div className="new-post-container">
        <h2 className="new-post-title">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="new-post-input"
          />
          <br />
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
            className="new-post-input"
          />
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Years of Experience"
            className="new-post-input"
          />
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Important skills: skillA, skillB, skillC..."
            className="new-post-input"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Description"
            className="new-post-textarea"
          />
          <br />
          <button type="submit" className="new-post-button">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
