import React from "react";
import "../styles/MyApplication.css";

const MyApplication = ({ application, postID }) => {
  const deleteApplication = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      console.log(postID);

      const apiUrl = `http://localhost:4000/posts/${postID}/applications/delete`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();

      console.log("Application deleted successfully:", data);

      return data;
    } catch (error) {
      console.error("Error deleting application:", error.message);
      throw error;
    }
  };
  return (
    <div className="my-application">
      <h2 className="applicant-name">{application.name}</h2>

      <h3 className="cover-letter-heading">Cover Letter</h3>
      <p className="cover-letter-content">{application.cover_letter}</p>

      <h3 className="resume-heading">Resume</h3>
      <a
        href="{resumeUrl}"
        className="resume-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Resume (PDF)
      </a>

      <div className="action-buttons">
        <button className="delete-button" onClick={deleteApplication}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyApplication;
