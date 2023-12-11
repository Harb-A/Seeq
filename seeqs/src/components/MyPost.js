import "../styles/MyPost.css";

const MyPost = ({ post, fetchPostsData, hidden }) => {
  // API call to update the post from hidden to public and vice versa
  const toggleHidden = async () => {
    try {
      const postId = post._id;
      const authToken = localStorage.getItem("accessToken");

      const response = await fetch(
        `http://localhost:4000/posts/hiding/${postId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Post status updated to shown");
        fetchPostsData();
      } else {
        console.error("Error updating post status");
      }
    } catch (error) {
      console.error("Error updating post status:", error);
    }
  };

  // API call to delete the post
  const deletePost = async () => {
    try {
      const postId = post._id;
      const authToken = localStorage.getItem("accessToken");

      const response = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Post deleted");
        fetchPostsData();
      } else {
        console.error("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="my-post">
      <div className="post-header">
        <h3>{post.title}</h3>
        <p>{post.position}</p>
      </div>
      <p>{post.description}</p>
      <div className="important-skills">{post.skills.join(", ")}</div>
      <div className="my-post-buttons">
        <button onClick={toggleHidden} className="my-post-hide-button">
          {hidden ? "Show" : "Hide"}
        </button>
        <button onClick={deletePost} className="my-post-delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyPost;
