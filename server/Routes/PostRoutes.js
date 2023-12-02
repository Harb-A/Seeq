const express = require("express");
const router = express.Router();
const {getPosts, getMyPosts, getUserPosts, createPost} = require("../Controllers/PostController");
const verifyJWT = require("../Middleware/VerifyJWT");

router.use(verifyJWT);

router.route("/").get(getPosts);
router.route("/myposts").get(getMyPosts);
router.route("/create").post(createPost);
router.route("/:pId").get(getUserPosts);

module.exports = router;