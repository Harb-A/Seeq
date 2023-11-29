import React, { useState } from "react";
import Taskbar from "../components/Taskbar.js";
import JobCard from "../components/JobCard.js";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showRecommendedPosts, setShowRecommendedPosts] = useState(false);

  //Dummy array 1
  const allPostsData = [
    { id: 1, title: "Job 1", body: "Description for Job 1" },
    { id: 2, title: "Job 2", body: "Description for Job 2" },
    { id: 3, title: "Job 3", body: "Description for Job 3" },
    { id: 4, title: "Job 4", body: "Description for Job 4" },
    { id: 5, title: "Job 5", body: "Description for Job 5" },
    { id: 6, title: "Job 6", body: "Description for Job 6" },
    { id: 7, title: "Job 7", body: "Description for Job 7" },
    { id: 8, title: "Job 8", body: "Description for Job 8" },
    { id: 9, title: "Job 9", body: "Description for Job 9" },
    { id: 10, title: "Job 10", body: "Description for Job 10" },
  ];

  //Dummy array 2
  const recommendedPostsData = [
    {
      id: 11,
      title: "Recommended Job 1",
      body: "Description for Recommended Job 1",
    },
    {
      id: 12,
      title: "Recommended Job 2",
      body: "Description for Recommended Job 2",
    },
    {
      id: 13,
      title: "Recommended Job 3",
      body: "Description for Recommended Job 3",
    },
    {
      id: 14,
      title: "Recommended Job 4",
      body: "Description for Recommended Job 4",
    },
    {
      id: 15,
      title: "Recommended Job 5",
      body: "Description for Recommended Job 5",
    },
    {
      id: 16,
      title: "Recommended Job 6",
      body: "Description for Recommended Job 6",
    },
    {
      id: 17,
      title: "Recommended Job 7",
      body: "Description for Recommended Job 7",
    },
    {
      id: 18,
      title: "Recommended Job 8",
      body: "Description for Recommended Job 8",
    },
    {
      id: 19,
      title: "Recommended Job 9",
      body: "Description for Recommended Job 9",
    },
    {
      id: 20,
      title: "Recommended Job 10",
      body: "Description for Recommended Job 10",
    },
  ];

  // Determine which array to use based on showRecommendedPosts
  const jobPosts = showRecommendedPosts ? recommendedPostsData : allPostsData;

  // Pagination logic
  const maxPerPage = 5;
  const indexOfLastPost = currentPage * maxPerPage;
  const indexOfFirstPost = indexOfLastPost - maxPerPage;
  const displayedJobPosts = jobPosts.slice(indexOfFirstPost, indexOfLastPost);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      {/* Taskbar embedded into the dashboard */}
      <Taskbar />

      {/* Header of the dashboard containing the search and 2 filter buttons */}
      <div className="dashboard-header">
        <input
          type="text"
          placeholder="Search..."
          className="dashboard-search"
        />
        <button
          className={`dashboard-button ${
            !showRecommendedPosts ? "active" : ""
          }`}
          onClick={() => setShowRecommendedPosts(false)}
        >
          All Posts
        </button>
        <button
          className={`dashboard-button ${showRecommendedPosts ? "active" : ""}`}
          onClick={() => setShowRecommendedPosts(true)}
        >
          Recommended Posts
        </button>
      </div>

      {/* Map data from predefined arrays to job card component and render them */}
      <div className="job-cards-container">
        {displayedJobPosts.map((post) => (
          <JobCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination bar to navigate pages of the job posts if more than 5 */}
      <div className="dashboard-pagination-container">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <div>{`Page ${currentPage}`}</div>
        <button
          onClick={goToNextPage}
          disabled={indexOfLastPost >= jobPosts.length}
        >
          Next
        </button>
        <br></br>
      </div>
    </div>
  );
};

export default Dashboard;
