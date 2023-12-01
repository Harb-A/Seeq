import React, { useState } from "react";
import Taskbar from "../components/Taskbar";
import "../styles/NewPost.css";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!title || !position || !skills || !body) {
      alert("Please fill in all fields");
      return;
    }

    // Retrieve the bearer token from local storage
    const authToken = localStorage.getItem("accessToken");

    if (!authToken) {
      alert("Authentication token not found. Please log in.");
      return;
    }

    // Prepare form data
    const formData = {
      title,
      position,
      skills,
      body,
    };

    try {
      // Make a request to the DUMMYAPI with the bearer token and form data
      const response = await fetch("DUMMYAPI_URL", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Clear form fields
      setTitle("");
      setPosition("");
      setSkills("");
      setBody("");

      // Provide additional feedback to the user, e.g., display a success message
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      // Provide feedback to the user about the error, e.g., display an error message
      alert("An error occurred while creating the post. Please try again.");
    }
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
