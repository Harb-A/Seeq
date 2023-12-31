import React from "react";
import { useEffect, useState, useCallback } from "react";
import MyPost from "../components/MyPost.js";
import Taskbar from "../components/Taskbar.js";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Posts.css";

const Posts = () => {
  const navigate = useNavigate();
  // Use state to keep track of public posts
  const [publicPostsData, setPublicPostsData] = useState([]);

  //Use state to keep trach of hidden posts
  const [hiddenPostsData, setHiddenPostsData] = useState([]);

  //Use state to keep track of whether to display hiddenPosts or publicPosts
  const [showHiddenPosts, setShowHiddenPosts] = useState(false);

  //Use state for loading messages
  const [loadingPublicPosts, setLoadingPublicPosts] = useState(true);
  const [loadingHiddenPosts, setLoadingHiddenPosts] = useState(true);

  //Use state to keep track of the current page for the sake of pagination
  const [currentPage, setCurrentPage] = useState(1);
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const maxPerPage = 5;

  //API fetch to retrieve public posts data from mongoDB
  const fetchPublicPosts = useCallback(async () => {
    try {
      setLoadingPublicPosts(true);

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        // If not authenticated, redirect to the login page
        console.log("Access token not found. Redirecting to login page...");
        navigate("/"); // Adjust the path based on your route setup
      }
      const response = await fetch(
        `http://localhost:4000/posts/paging/public/?page=${currentPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPublicPostsData(data);
      } else {
        console.error(
          "Failed to fetch data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      setLoadingPublicPosts(false);
    }
  }, [currentPage]);
  useEffect(() => {
    fetchPublicPosts();
  }, [currentPage, fetchPublicPosts]);

  //API fetch to retrieve hidden posts data from mongoDB
  const fetchHiddenPosts = useCallback(async () => {
    try {
      setLoadingHiddenPosts(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        // If not authenticated, redirect to the login page
        console.log("Access token not found. Redirecting to login page...");
        navigate("/"); // Adjust the path based on your route setup
      }
      const response = await fetch(
        `http://localhost:4000/posts/paging/hidden/?page=${currentPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHiddenPostsData(data);
      } else {
        console.error(
          "Failed to fetch hidden data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during hidden fetch:", error);
    } finally {
      setLoadingHiddenPosts(false);
    }
  }, [currentPage]);
  useEffect(() => {
    fetchHiddenPosts();
  }, [currentPage, fetchHiddenPosts]);

  //Refresh posts data in the arrays
  const refreshPostsData = async () => {
    try {
      await fetchPublicPosts();
      await fetchHiddenPosts();
    } catch (error) {
      console.error("Error fetching posts data:", error);
    }
  };

  //Depending on state, select the corresponding list of posts
  const displayedPosts = showHiddenPosts ? hiddenPostsData : publicPostsData;

  return (
    <div>
      {/* Taskbard embbeded into the My posts page */}
      <Taskbar />

      <div>
        {/* Buttons to toggle between hidden and public posts */}
        <div className="posts-button-container">
          <Link to="/new-post" className="posts-create-new">
            Create New Post
          </Link>

          <button
            className={`posts-toggle ${showHiddenPosts ? "" : "active"}`}
            onClick={() => setShowHiddenPosts(false) & setCurrentPage(1)}
          >
            Public Posts
          </button>
          <button
            className={`posts-toggle ${showHiddenPosts ? "active" : ""}`}
            onClick={() => setShowHiddenPosts(true) & setCurrentPage(1)}
          >
            Hidden Posts
          </button>
        </div>

        {/* Display "Loading..." message while data is being fetched */}
        {loadingPublicPosts || loadingHiddenPosts ? (
          <div className="api-status-container">Loading...</div>
        ) : null}

        {/* Display "Nothing found" message if there are no posts */}
        {!loadingPublicPosts &&
        !loadingHiddenPosts &&
        displayedPosts.length === 0 ? (
          <div className="api-status-container">Nothing found.</div>
        ) : null}

        {/* Public or hidden posts based on state*/}
        <div className="posts-container">
          {showHiddenPosts
            ? displayedPosts.map((post) => (
                <MyPost
                  key={post._id}
                  post={post}
                  fetchPostsData={refreshPostsData}
                  hidden={true}
                />
              ))
            : displayedPosts.map((post) => {
                console.log(post);
                return (
                  <MyPost
                    key={post._id}
                    post={post}
                    fetchPostsData={refreshPostsData}
                    hidden={false}
                  />
                );
              })}
        </div>

        {/* Pagination bar to navigate pages of the posts if more than 5 */}
        <div className="posts-pagination-container">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            &lt;
          </button>
          <div>{`Page ${currentPage}`}</div>
          <button
            onClick={goToNextPage}
            disabled={displayedPosts.length < maxPerPage}
          >
            &gt;
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Posts;
