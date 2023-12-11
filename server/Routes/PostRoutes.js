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
  hiding,
  apply,
  accept,
  reject,
  deleteApplication,
  getMyApplications,
  postsWithApps
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
router.route("/paging/public").get(paginatedPublicPosts);

// route link (http://localhost:4000/posts/paging/hidden)
router.route("/paging/hidden").get(paginatedHiddenPosts);

// route link (http://localhost:4000/posts/create)
router.route("/create").post(createPost);

// route link http://localhost:4000/posts/hiding/:pId
router.route("/hiding/:pId").put(hiding);

// route link (http://localhost:4000/posts/:pId/apply)
router.route("/:pId/apply").post(apply);

router.route("/:pId/applications/delete").delete(deleteApplication);

// route link (http://localhost:4000/posts/myapplications)
router.route("/myapplications").get(getMyApplications);

// route link (http://localhost:4000/posts/postsWithApps)
router.route("/postsWithApps").get(postsWithApps);

// route link (http://localhost:4000/posts/:pId/applications/:aId/accept)
router.route("/:pId/applications/:aId/accept").put(accept);

// route link (http://localhost:4000/posts/:pId/applications/:aId/reject)
router.route("/:pId/applications/:aId/reject").put(reject);


// route link (http://localhost:4000/posts/:pId)
router.route("/:pId").get(getUserPosts);

// route link (http://localhost:4000/posts/:postId)
router.delete("/:postId", deletePost);



module.exports = router;
