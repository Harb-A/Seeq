import React, { useState } from "react";
import Taskbar from "../components/Taskbar.js";
import JobCard from "../components/JobCard.js";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showRecommendedPosts, setShowRecommendedPosts] = useState(false);

  // Dummy Array 1
  const allPostsData = [
    {
      id: 1,
      title: "Job 1",
      body: [
        "Exciting Opportunity: Job 1",
        "Are you ready for a dynamic role that challenges your skills and fosters professional growth?",
        "Join our team as we embark on innovative projects that make a real impact.",
        "As a key contributor, you will play a crucial part in shaping the future of our company.",
      ],
    },
    {
      id: 2,
      title: "Job 2",
      body: [
        "Unleash Your Potential: Job 2",
        "Dive into the world of Job 2, where creativity meets technical excellence.",
        "We are seeking individuals who are passionate about their craft and eager to contribute to a collaborative and forward-thinking environment.",
        "Take the next step in your career journey with us!",
      ],
    },
    {
      id: 3,
      title: "Job 3",
      body: [
        "Chart Your Course: Job 3",
        "Imagine a workplace where your ideas are not only heard but celebrated.",
        "Job 3 offers you the chance to be part of a team that values innovation and encourages personal and professional development.",
        "Your journey towards success begins here.",
      ],
    },
    {
      id: 4,
      title: "Job 4",
      body: [
        "Innovate and Elevate: Job 4",
        "Join us in pushing the boundaries of what's possible.",
        "Job 4 is more than just a job; it's an invitation to be a trailblazer in your field.",
        "Challenge yourself, grow with us, and let's create a future full of accomplishments together.",
      ],
    },
    {
      id: 5,
      title: "Job 5",
      body: [
        "Beyond the Ordinary: Job 5",
        "Are you ready to break free from the ordinary?",
        "Job 5 welcomes individuals who are not afraid to explore new horizons and embrace challenges.",
        "Your unique skills are what we need to make a difference. Join us and let's redefine success together.",
      ],
    },
    {
      id: 6,
      title: "Job 6",
      body: [
        // Description for Job 6
      ],
    },
    {
      id: 7,
      title: "Job 7",
      body: [
        // Description for Job 7
      ],
    },
    {
      id: 8,
      title: "Job 8",
      body: [
        // Description for Job 8
      ],
    },
    {
      id: 9,
      title: "Job 9",
      body: [
        // Description for Job 9
      ],
    },
    {
      id: 10,
      title: "Job 10",
      body: [
        // Description for Job 10
      ],
    },
  ];

  // Dummy Array 2
  const recommendedPostsData = [
    {
      id: 11,
      title: "Recommended Job 1",
      body: [
        "Pioneer the Future: Recommended Job 1",
        "Take the lead in Recommended Job 1, where every day brings new possibilities.",
        "This role is designed for those who seek innovation and want to be at the forefront of groundbreaking projects.",
        "Join us and be a driving force in shaping the future.",
      ],
    },
    {
      id: 12,
      title: "Recommended Job 2",
      body: [
        "Elevate Your Career: Recommended Job 2",
        "Unlock new heights in Recommended Job 2, where your skills and aspirations align with our commitment to excellence.",
        "Join a team that values collaboration and encourages you to reach your full potential. Your success is our priority.",
      ],
    },
    {
      id: 13,
      title: "Recommended Job 3",
      body: [
        // Description for Recommended Job 3
      ],
    },
    {
      id: 14,
      title: "Recommended Job 4",
      body: [
        // Description for Recommended Job 4
      ],
    },
    {
      id: 15,
      title: "Recommended Job 5",
      body: [
        // Description for Recommended Job 5
      ],
    },
    {
      id: 16,
      title: "Recommended Job 6",
      body: [
        // Description for Recommended Job 6
      ],
    },
    {
      id: 17,
      title: "Recommended Job 7",
      body: [
        // Description for Recommended Job 7
      ],
    },
    {
      id: 18,
      title: "Recommended Job 8",
      body: [
        // Description for Recommended Job 8
      ],
    },
    {
      id: 19,
      title: "Recommended Job 9",
      body: [
        // Description for Recommended Job 9
      ],
    },
    {
      id: 20,
      title: "Recommended Job 10",
      body: [
        // Description for Recommended Job 10
      ],
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
          onClick={() => setShowRecommendedPosts(false) & setCurrentPage(1)}
        >
          All Posts
        </button>
        <button
          className={`dashboard-button ${showRecommendedPosts ? "active" : ""}`}
          onClick={() => setShowRecommendedPosts(true) & setCurrentPage(1)}
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
