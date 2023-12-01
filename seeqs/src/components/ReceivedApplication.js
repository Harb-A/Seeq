import React from "react";
import "../styles/ReceivedApplication.css";

const ReceivedApplication = ({
  name,
  email,
  phone,
  coverLetter,
  resumeUrl,
}) => {
  const handleAccept = () => {
    console.log(`Application from ${name} accepted`);
  };

  const handleDeny = () => {
    console.log(`Application from ${name} denied`);
  };

  return (
    <div className="received-application">
      <h2 className="applicant-name">{name}</h2>
      <p className="applicant-email">Email: {email}</p>
      <p className="applicant-phone">Phone: {phone}</p>

      <h3 className="cover-letter-heading">Cover Letter</h3>
      <p className="cover-letter-content">{coverLetter}</p>

      <h3 className="resume-heading">Resume</h3>
      <a
        href={resumeUrl}
        className="resume-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Resume (PDF)
      </a>

      <div className="action-buttons">
        <button className="deny-button" onClick={handleDeny}>
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
