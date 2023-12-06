import React from "react";
import "../styles/JobCard.css";
import { Link } from "react-router-dom";

const JobCard = ({ post }) => {
  return (
    /* Main container*/
    <div className="job-card">
      {/* Header with job title and position */}
      <div className="job-card-header">
        <h3>{post.title}</h3>
        <p>{post.position}</p>
      </div>
      {/* Job description */}
      <p>{post.description}</p>
      {/* Job skills */}
      <div className="important-skills">Skills: {post.skills.join(", ")}</div>
      {/* Apply and view more section */}
      <div className="apply-section">
        <Link to={`/detail/${post._id}`}>
          <span className="apply-button">Read more/apply &gt;&gt;&gt;</span>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
