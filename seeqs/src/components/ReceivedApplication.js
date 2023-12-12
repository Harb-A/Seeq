import React from "react";
import "../styles/ReceivedApplication.css";
import { useNavigate } from "react-router-dom";

const ReceivedApplication = ({ application, postID }) => {
  const navigate = useNavigate();
  const handleAccept = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        // If not authenticated, redirect to the login page
        console.log("Access token not found. Redirecting to login page...");
        navigate("/"); // Adjust the path based on your route setup
      }

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
      if (!accessToken) {
        // If not authenticated, redirect to the login page
        console.log("Access token not found. Redirecting to login page...");
        navigate("/"); // Adjust the path based on your route setup
      }

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

  const handleViewResume = async () => {
    try {
      const postId = postID;
      const userId = application.user_id;

      const apiUrl = `http://localhost:4000/posts/${postId}/resume/${application.user_id}`;

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.log("Access token not found. Redirecting to login page...");
        navigate("/");
        return;
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const blob = await response.blob();
      console.log(blob);
      const resumeUrl = URL.createObjectURL(blob);

      // Open the PDF in a new window
      window.open(resumeUrl, "_blank");
    } catch (error) {
      console.error("Error fetching or opening PDF:", error.message);
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
      <a href="#" className="resume-link" onClick={handleViewResume}>
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
