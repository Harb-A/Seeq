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
    hidden: false,
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
  console.log(req.user.id);
  console.log(post.user_id.toString() === req.user.id);
  if (post.user_id.toString() === req.user.id) {
    const post = await Post.findByIdAndDelete(postId);
  } else {
    res.status(401);
    throw new Error("You are not authorized to delete this post");
  }

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.json({ message: "Post deleted successfully" });
});

const paginatedPosts = asyncHandler(async (req, res) => {
  console.log(req.query.page);
  const page = parseInt(req.query.page);
  const limit = 5; // Set the limit to 5

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const posts = await Post.find({})
    .sort({ _id: 1 })
    .skip(startIndex)
    .limit(limit);

  res.json(posts);
});
const paginatedPublicPosts = asyncHandler(async (req, res) => {
  console.log(req.query.page);
  const page = parseInt(req.query.page);
  const limit = 5; // Set the limit to 5

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const posts = await Post.find({ hidden: false })
    .sort({ _id: 1 })
    .skip(startIndex)
    .limit(limit);

  res.json(posts);
});
const paginatedHiddenPosts = asyncHandler(async (req, res) => {
  console.log(req.query.page);
  const page = parseInt(req.query.page);
  const limit = 5; // Set the limit to 5

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const posts = await Post.find({ hidden: true })
    .sort({ _id: 1 })
    .skip(startIndex)
    .limit(limit);

  res.json(posts);
});

const hiding = asyncHandler(async (req, res) => {
  const postId = req.params.pId;
  const userId = req.user.id;
  console.log;
  const post = await Post.findOne({ _id: postId, user_id: userId });

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  post.hidden = !post.hidden;
  const updatedPost = await post.save();

  return res.json(updatedPost);
});

const apply = asyncHandler(async (req, res) => {
  const postId = req.params.pId;
  const userId = req.user.id;

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const existingApplication = post.applications.find(
    (app) => app.user_id.toString() === userId.toString()
  );

  if (existingApplication) {
    return res
      .status(400)
      .json({ message: "You have already applied to this post" });
  }

  const newApplication = {
    user_id: userId,
    cover_letter: req.body.cover_letter, // Assuming the cover letter is sent in the request body
    accepted: 0,
  };

  post.applications.push(newApplication);
  const updatedPost = await post.save();

  return res.json(updatedPost);
});

//this function takes the post id and the applicant id and accepts the applicant, also it checks if the user that made the post is the one accepting the application
const accept = asyncHandler(async (req, res) => {
  const postId = req.params.pId;
  const applicantId = req.params.aId;
  const userId = req.user.id;

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Check if the user that made the post is the one accepting the application
  if (post.user_id.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("You do not have permission to accept this application");
  }

  const application = post.applications.find(
    (app) => app.user_id.toString() === applicantId
  );

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  application.accepted = 1;
  const updatedPost = await post.save();

  return res.json(updatedPost);
});

const reject = asyncHandler(async (req, res) => {
  const postId = req.params.pId;
  const applicantId = req.params.aId;
  const userId = req.user.id; // Assuming req.user._id contains the id of the current user

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Check if the user that made the post is the one rejecting the application
  if (post.user_id.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("You do not have permission to reject this application");
  }

  const application = post.applications.find(
    (app) => app.user_id.toString() === applicantId
  );

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  application.accepted = -1;
  const updatedPost = await post.save();

  return res.json(updatedPost);
});

const deleteApplication = asyncHandler(async (req, res) => {
  const postId = req.params.pId;
  const userId = req.user.id; // Assuming req.user._id contains the id of the current user

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const application = post.applications.find(
    (app) => app.user_id.toString() === userId.toString()
  );

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  // Check if the user that made the application is the one deleting it
  if (application.user_id.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("You do not have permission to delete this application");
  }

  // Remove the application from the applications array
  post.applications.pull(application);
  const updatedPost = await post.save();

  return res.json(updatedPost);
});

module.exports = {
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
};
