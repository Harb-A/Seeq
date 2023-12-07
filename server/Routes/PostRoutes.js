const express = require("express");
const router = express.Router();
const {
  getPosts,
  getMyPosts,
  getUserPosts,
  createPost,
  deletePost,
  paginatedPosts,
  paginatedPublicPosts,
  paginatedHiddenPosts,
  hiding
} = require("../Controllers/PostController");
const verifyJWT = require("../Middleware/VerifyJWT");

router.use(verifyJWT);

// route link (http://localhost:4000/posts/)
router.route("/").get(getPosts);

// route link (http://localhost:4000/posts/myposts)
router.route("/myposts").get(getMyPosts);

// route link (http://localhost:4000/posts/paging)
router.route("/paging").get(paginatedPosts);

// route link (http://localhost:4000/posts/paging/public)
router.route("/paging/public").get(paginatedPosts);

// route link (http://localhost:4000/posts/paging/hidden)
router.route("/paging/hidden").get(paginatedPosts);

// route link (http://localhost:4000/posts/create)
router.route("/create").post(createPost);

// route link (http://localhost:4000/posts/:pId)
router.route("/:pId").get(getUserPosts);

// route link (http://localhost:4000/posts/:postId)
router.delete("/:postId", deletePost);

// route link http://localhost:4000/posts/hiding/:pId
router.route("/hiding/:pId").put(hiding);

module.exports = router;
