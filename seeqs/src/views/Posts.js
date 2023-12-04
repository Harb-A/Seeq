import React from "react";
import { useState } from "react";

import PublicPost from "../components/PublicPost.js";
import HiddenPost from "../components/HiddenPost.js";
import Taskbar from "../components/Taskbar.js";
import { Link } from "react-router-dom";
import "../styles/Posts.css";

const Posts = () => {
  // Dummy Array containing public job posts (later feed data from API)
  const jobPosts = [
    {
      id: 1,
      title: "Job Post 1",
      position: "Position 1",
      importantSkills: "Skills 1",
      description: "Description 1",
    },
    {
      id: 2,
      title: "Job Post 2",
      position: "Position 2",
      importantSkills: "Skills 2",
      description: "Description 2",
    },
    {
      id: 3,
      title: "Job Post 3",
      position: "Position 3",
      importantSkills: "Skills 3",
      description: "Description 3",
    },
    {
      id: 4,
      title: "Job Post 4",
      position: "Position 4",
      importantSkills: "Skills 4",
      description: "Description 4",
    },
    {
      id: 5,
      title: "Job Post 5",
      position: "Position 5",
      importantSkills: "Skills 5",
      description: "Description 5",
    },
    {
      id: 6,
      title: "Job Post 6",
      position: "Position 6",
      importantSkills: "Skills 6",
      description: "Description 6",
    },
  ];

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
                <PublicPost
                  key={post.id}
                  title={post.title}
                  position={post.position}
                  importantSkills={post.importantSkills}
                  description={post.description}
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
