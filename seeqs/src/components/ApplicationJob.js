import React from "react";
import "../styles/ApplicationJob.css";

const ApplicationJob = ({ post }) => {
  return (
    /* Main container*/
    <div className="application-job-card">
      {/* Header with job title and position */}
      <div className="application-job-card-header">
        <h3>{post.title}</h3>
        <p>{post.position}</p>
      </div>
      {/* Job description */}
      <p>{post.description}</p>
      {/* Job skills */}
      <div className="application-job-important-skills">
        Skills: {post.skills.join(", ")}
      </div>
    </div>
  );
};

export default ApplicationJob;
