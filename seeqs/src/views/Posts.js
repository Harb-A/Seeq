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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:4000/posts/myposts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

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
      }
    };

    fetchData();
  }, []);

  // Dummy Array containing hidden job posts (later feed data from API)
  const hiddenPosts = [
    {
      id: 7,
      title: "Hidden Post 1",
      position: "Hidden Position 1",
      importantSkills: "Hidden Skills 1",
      description: "Hidden Description 1",
    },
    {
      id: 8,
      title: "Hidden Post 2",
      position: "Hidden Position 2",
      importantSkills: "Hidden Skills 2",
      description: "Hidden Description 2",
    },
    {
      id: 9,
      title: "Hidden Post 3",
      position: "Hidden Position 3",
      importantSkills: "Hidden Skills 3",
      description: "Hidden Description 3",
    },
    {
      id: 10,
      title: "Hidden Post 4",
      position: "Hidden Position 4",
      importantSkills: "Hidden Skills 4",
      description: "Hidden Description 4",
    },
    {
      id: 11,
      title: "Hidden Post 5",
      position: "Hidden Position 5",
      importantSkills: "Hidden Skills 5",
      description: "Hidden Description 5",
    },
    {
      id: 12,
      title: "Hidden Post 6",
      position: "Hidden Position 6",
      importantSkills: "Hidden Skills 6",
      description: "Hidden Description 6",
    },
  ];

  //State to determine whether to show you public posts or your hidden ones
  const [showHiddenPosts, setShowHiddenPosts] = useState(false);

  //State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const maxPerPage = 5;
  const indexOfLastPost = currentPage * maxPerPage;
  const indexOfFirstPost = indexOfLastPost - maxPerPage;

  //Depending on state, select the corresponding list of posts
  const postsToShow = showHiddenPosts ? hiddenPosts : publicPostsData;
  const displayedPosts = postsToShow.slice(indexOfFirstPost, indexOfLastPost);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

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

        {/* Public or hidden posts based on state*/}
        <div className="posts-container">
          {showHiddenPosts
            ? displayedPosts.map((post) => (
                <HiddenPost
                  key={post.id}
                  title={post.title}
                  position={post.position}
                  importantSkills={post.importantSkills}
                  description={post.description}
                />
              ))
            : displayedPosts.map((post) => (
                <PublicPost key={post.id} post={post} />
              ))}
        </div>

        {/* Pagination bar to navigate pages of the posts if more than 5 */}
        <div className="posts-pagination-container">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            &lt;
          </button>
          <div>{`Page ${currentPage}`}</div>
          <button
            onClick={goToNextPage}
            disabled={indexOfLastPost >= postsToShow.length}
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
