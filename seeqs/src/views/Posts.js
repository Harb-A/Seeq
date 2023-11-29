import React from "react";
import { useState } from "react";

import PersonalCard from "../components/PersonalCard.js";
import Taskbar from "../components/Taskbar.js";
import { Link } from "react-router-dom";
import "../styles/Posts.css";

const Posts = () => {
  //Dummy Array containing personal job posts (later feed data from API)
  const jobPosts = [
    { id: 1, title: "Job Post 1", description: "Description 1" },
    { id: 2, title: "Job Post 2", description: "Description 2" },
    { id: 3, title: "Job Post 3", description: "Description 3" },
    { id: 4, title: "Job Post 4", description: "Description 4" },
    { id: 5, title: "Job Post 5", description: "Description 5" },
    { id: 6, title: "Job Post 6", description: "Description 6" },
  ];

  //Dummy Array containing hidden job posts (later feed data from API)
  const hiddenPosts = [
    { id: 7, title: "Hidden Post 1", description: "Hidden Description 1" },
    { id: 8, title: "Hidden Post 2", description: "Hidden Description 2" },
    { id: 9, title: "Hidden Post 3", description: "Hidden Description 3" },
    { id: 10, title: "Hidden Post 4", description: "Hidden Description 4" },
    { id: 11, title: "Hidden Post 5", description: "Hidden Description 5" },
    { id: 12, title: "Hidden Post 6", description: "Hidden Description 6" },
  ];

  //State to determine whether to show you public posts or your hidden ones
  const [showHiddenPosts, setShowHiddenPosts] = useState(false);

  //State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const maxPerPage = 5;
  const indexOfLastPost = currentPage * maxPerPage;
  const indexOfFirstPost = indexOfLastPost - maxPerPage;

  //Depending on state, select the corresponding list of posts
  const postsToShow = showHiddenPosts ? hiddenPosts : jobPosts;
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
          <button className="posts-create-new">
            <Link to="/new-post">Create New Post</Link>
          </button>
          <button
            className={`posts-toggle ${showHiddenPosts ? "" : "active"}`}
            onClick={() => setShowHiddenPosts(false)}
          >
            Public Posts
          </button>
          <button
            className={`posts-toggle ${showHiddenPosts ? "active" : ""}`}
            onClick={() => setShowHiddenPosts(true)}
          >
            Hidden Posts
          </button>
        </div>

        {/* Public or hidden posts based on state*/}
        <div className="posts-container">
          {showHiddenPosts
            ? displayedPosts.map((post) => (
                <PersonalCard
                  key={post.id}
                  title={post.title}
                  description={post.description}
                  isHidden={true}
                />
              ))
            : displayedPosts.map((post) => (
                <PersonalCard
                  key={post.id}
                  title={post.title}
                  description={post.description}
                  isHidden={false}
                />
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
