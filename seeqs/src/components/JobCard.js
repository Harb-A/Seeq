import React from "react";
import "../styles/JobCard.css";

const JobCard = ({ post }) => {
  const yaya = () => {
    console.log(post);
    // Add your desired functionality here
  };

  return (
    <div className="job-card">
      {/* Title of the job card */}
      <h3 className="job-card-title">{post.title}</h3>
      {/* Main body of the job card */}
      <p className="job-card-body">{post.body}</p>

      {/* Apply span */}
      <div className="apply-section">
        <span className="apply-button" onClick={yaya}>
          Read more/apply &gt;&gt;&gt;
        </span>
      </div>
    </div>
  );
};

export default JobCard;
