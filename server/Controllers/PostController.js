const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Post = require("../Models/PostModel");
// const { post } = require("../Routes/AuthRoutes");
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

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);

  // Find the post by ID and delete it
  console.log(post.user_id.toString());
  console.log(req.user.id)
  console.log(post.user_id.toString() === req.user.id)
  if(post.user_id.toString() === req.user.id){
  const post = await Post.findByIdAndDelete(postId);
  }
  else{
    res.status(401);
    throw new Error('You are not authorized to delete this post');
  }

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  res.json({ message: "Post deleted successfully" });
});

module.exports = { getPosts, getMyPosts, getUserPosts, createPost, deletePost};