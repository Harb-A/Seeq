const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Post = require("../Models/PostModel");
require("dotenv").config();

// route link (http://localhost:4000/posts/)
const getPosts = asyncHandler(async (req, res) => {
  const post = await Post.find({});
  console.log(post.skills);
  res.json(post);
});
// route link (http://localhost:4000/posts/myposts)
const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user_id: req.user.id });
  res.json(posts);
});
// route link (http://localhost:4000/posts/create)
const createPost = asyncHandler(async (req, res) => {
  const { title, position, skills, description, hidden } = req.body;
  // console.log(req.body);
  const userId = req.user.id; 

  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    user_id: userId,
    title,
    position,
    skills,
    description,
    applications: [],
    hidden: false
  });

  await post.save();

  res.json(post);
});
// route link (http://localhost:4000/posts/:pId)
const getUserPosts = asyncHandler(async (req, res) => {
  pId = req.params.pId;
  const posts = await Post.find({ _id: req.params.pId });
  res.json(posts);
});
module.exports = { getPosts, getMyPosts, getUserPosts, createPost };