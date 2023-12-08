import React, { useState } from "react";
import Taskbar from "../components/Taskbar";
import "../styles/NewPost.css";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");

  const handleSkillChange = (e) => {
    const skillsArray = e.target.value.split(",").map((skill) => skill.trim());
    setSkills(skillsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!title || !position || !skills || !description) {
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
      description,
    };

    try {
      // Make a request to the DUMMYAPI with the bearer token and form data
      const response = await fetch("http://localhost:4000/posts/create", {
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
      setDescription("");

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
        <div className="new-post">
          {" "}
          <h1 className="new-post-title">Create a New Post</h1>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="new-post-input"
          />
          <label>Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="new-post-input"
          />
          <label>Important skills: skillA, skillB, skillC...</label>
          <input
            type="text"
            value={skills}
            onChange={handleSkillChange}
            className="new-post-input"
          />
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="new-post-textarea"
          />
          <br />
          <button
            type="submit"
            className="new-post-button"
            onClick={handleSubmit}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
