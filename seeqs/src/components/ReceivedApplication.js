import React from "react";
import "../styles/ReceivedApplication.css";

const ReceivedApplication = ({ application, postID }) => {
  const handleAccept = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const apiUrl = `http://localhost:4000/posts/${postID}/applications/${application.user_id}/accept`;

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Application accepted successfully:", data);

      return data;
    } catch (error) {
      console.error("Error accepting application:", error.message);
      throw error;
    }
  };

  const handleReject = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const apiUrl = `http://localhost:4000/posts/${postID}/applications/${application.user_id}/reject`;

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Application rejected successfully:", data);

      // You can perform additional actions after rejection if needed
      return data;
    } catch (error) {
      console.error("Error rejecting application:", error.message);
      throw error;
    }
  };

  const getStatusClassName = () => {
    // Use the accepted variable to determine the class name
    return application.accepted === 1
      ? "accepted"
      : application.accepted === -1
      ? "rejected"
      : "";
  };
  return (
    <div className={`received-application ${getStatusClassName()}`}>
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
        <button className="deny-button" onClick={handleReject}>
          Deny
        </button>
        <button className="accept-button" onClick={handleAccept}>
          Accept
        </button>
      </div>
    </div>
  );
};
export default ReceivedApplication;
