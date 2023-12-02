const { Mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const Post = require("../Models/PostModel");
require("dotenv").config();

// route link (http://localhost:4000/posts/)
const getPosts = asyncHandler(async (req, res) => {
  const post = await Post.find({});
  console.log(post.skills);
  res.json(post);
});

module.exports = { getPosts };