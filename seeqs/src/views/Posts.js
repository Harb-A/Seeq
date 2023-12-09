import React from "react";
import { useEffect, useState } from "react";

import PublicPost from "../components/PublicPost.js";
import HiddenPost from "../components/HiddenPost.js";
import Taskbar from "../components/Taskbar.js";
import { Link } from "react-router-dom";
import "../styles/Posts.css";

const Posts = () => {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingPublicPosts(true);

        const accessToken = localStorage.getItem("accessToken");
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
          // Assuming the API returns an array of job posts and hidden posts
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
    };

    fetchData();
  }, [currentPage]);

  //API fetch to retrieve hidden posts data from mongoDB
  useEffect(() => {
    const fetchHiddenData = async () => {
      try {
        setLoadingHiddenPosts(true);
        const accessToken = localStorage.getItem("accessToken");
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
          console.log(data, "hidden data");
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
    };

    fetchHiddenData();
  }, [currentPage]);

  //Depending on state, select the corresponding list of posts
  const postsToShow = showHiddenPosts ? hiddenPostsData : publicPostsData;
  const displayedPosts = postsToShow;

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
          <div>Loading...</div>
        ) : null}

        {/* Display "Nothing found" message if there are no posts */}
        {!loadingPublicPosts &&
        !loadingHiddenPosts &&
        displayedPosts.length === 0 ? (
          <div>Nothing found.</div>
        ) : null}

        {/* Public or hidden posts based on state*/}
        <div className="posts-container">
          {showHiddenPosts
            ? displayedPosts.map((post) => (
                <HiddenPost key={post._id} post={post} />
              ))
            : displayedPosts.map((post) => {
                console.log(post);
                return <PublicPost key={post._id} post={post} />;
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
