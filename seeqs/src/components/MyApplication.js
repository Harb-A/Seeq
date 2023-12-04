import React from "react";
import "../styles/MyApplication.css";

const MyApplication = ({
  name,
  email,
  phone,
  coverLetter,
  resumeUrl,
  onDelete,
}) => {
  const handleDelete = () => {
    console.log(`Application from ${name} deleted`);
    onDelete();
  };

  return (
    <div className="my-application">
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
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyApplication;
