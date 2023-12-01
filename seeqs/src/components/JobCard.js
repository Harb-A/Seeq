import React from "react";
import "../styles/JobCard.css";
import { Link } from "react-router-dom";

const JobCard = ({ post }) => {
  return (
    <div className="job-card">
      {/* Title of the job card */}
      <h3 className="job-card-title">{post.title}</h3>
      {/* Main body of the job card */}
      <p className="job-card-body">{post.body}</p>

      {/* Apply span */}
      <div className="apply-section">
        <Link to={`/detail/${post.id}`}>
          <span className="apply-button">Read more/apply &gt;&gt;&gt;</span>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
