import React, { useEffect, useState } from "react";
import Taskbar from "../components/Taskbar.js";
import JobCard from "../components/JobCard.js";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  //Check if the local storage contains the authentication token.
  //If the authentication token is present, allow the user to access the dashboard
  //If the authenticaion token is not present, send the user back to the login page.
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/");
    }
  });

  //Use state to keep track of the allPostData
  const [allPostsData, setAllPostsData] = useState([]);

  const [allRecommendedPostsData, setAllRecommendedPostsData] = useState([]);

  //Use state to keep track of the pagination to know what to send to the API
  const [currentPage, setCurrentPage] = useState(1);

  //Use state to determine wheter to show recommendedPosts or just allPosts
  const [showRecommendedPosts, setShowRecommendedPosts] = useState(false);

  //Fetch data for allPosts, one page at a time (Retrieve multiples of 5)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          // If not authenticated, redirect to the login page
          console.log("Access token not found. Redirecting to login page...");
          navigate("/"); // Adjust the path based on your route setup
        }
        const response = await fetch(
          `http://localhost:4000/posts/paging/?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Error response
        if (!response.ok) {
          console.error("Error fetching data. Status:", response.status);
          return;
        }

        const data = await response.json();

        setAllPostsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          // If not authenticated, redirect to the login page
          console.log("Access token not found. Redirecting to login page...");
          navigate("/"); // Adjust the path based on your route setup
        }
        const response = await fetch(
          `http://localhost:4000/posts/findMatchingPosts?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Error response
        if (!response.ok) {
          console.error("Error fetching data. Status:", response.status);
          return;
        }

        const data = await response.json();

        setAllRecommendedPostsData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Determine which array to use based on showRecommendedPosts
  const jobPosts = showRecommendedPosts
    ? allRecommendedPostsData
    : allPostsData;

  // Pagination logic
  const maxPerPage = 5;
  const displayedJobPosts = jobPosts;

  //State change for the currently displayed page
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
      {/* If busy fetching from API show loading */}
      {loading && <div className="api-status-container">Loading...</div>}
      {/* Show "Nothing found" message if there are no posts */}
      {!loading && displayedJobPosts.length === 0 && (
        <div className="api-status-container">Nothing found</div>
      )}
      {/* Map data from predefined arrays to job card component and render them */}
      <div className="job-cards-container">
        {showRecommendedPosts
          ? allRecommendedPostsData.map((post) => (
              <JobCard key={post._id} post={post} />
            ))
          : allPostsData.map((post) => <JobCard key={post._id} post={post} />)}
        {/* {displayedJobPosts.map((post) => (
          
        ))} */}
      </div>

      {/* Pagination bar to navigate pages of the job posts if more than 5 */}
      <div className="dashboard-pagination-container">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <div>{`Page ${currentPage}`}</div>
        <button
          onClick={goToNextPage}
          disabled={displayedJobPosts.length < maxPerPage}
        >
          Next
        </button>
        <br></br>
      </div>
    </div>
  );
};

export default Dashboard;
