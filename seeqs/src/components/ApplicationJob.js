import React from "react";
import "../styles/ApplicationJob.css";
import MyApplication from "./MyApplication";
import ReceivedApplication from "./ReceivedApplication";

const ApplicationJob = ({ post, isMine }) => {
  return (
    <>
      <div className="application-job-card">
        <div className="application-job-card-header">
          <h3>{post.title}</h3>
          <p>{post.position}</p>
        </div>
        <p>{post.description}</p>
        <div className="application-job-important-skills">
          Skills: {post.skills.join(", ")}
        </div>
        <br />
      </div>
      <div>
        {isMine
          ? post.applications.map((application) => (
              <MyApplication
                key={application._id}
                application={application}
                postID={post._id}
              />
            ))
          : post.applications.map((application) => (
              <ReceivedApplication
                key={application._id}
                application={application}
                postID={post._id}
              />
            ))}
      </div>
    </>
  );
};

export default ApplicationJob;
