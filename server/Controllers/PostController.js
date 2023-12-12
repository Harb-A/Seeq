const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Post = require("../Models/PostModel");
const User = require("../Models/UserModel");
const Resume = require("../Models/ResumeModel");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const { post } = require("../Routes/AuthRoutes");
require("dotenv").config();

// route link (http://localhost:4000/posts/)
const getPosts = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const posts = await Post.find({ user_id: { $ne: userId } });
  res.json(posts);
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
  const userId = req.user.id;
  const page = parseInt(req.query.page);
  const limit = 5; // Set the limit to 5

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const posts = await Post.find({ hidden: false, user_id: userId })
    .sort({ _id: 1 })
    .skip(startIndex)
    .limit(limit);

  res.json(posts);
});

const paginatedHiddenPosts = asyncHandler(async (req, res) => {
  console.log(req.query.page);
  const userId = req.user.id;
  const page = parseInt(req.query.page);
  const limit = 5; // Set the limit to 5

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const posts = await Post.find({ hidden: true, user_id: userId })
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
  //console logs
  const coverLLL = req.body.coverLetter;
  console.log("Request body1:", req.body.coverLetter);
  console.log("Request file1:", req.body.resume);
  upload.single("resume")(req, res, async (err) => {
    const postId = req.params.pId;
    const userId = req.user.id;

    //console logs
    console.log("Request body2:", req.body.coverLetter);
    console.log("Request file2:", req.body.resume);

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
      cover_letter: coverLLL,
      accepted: 0,
      resume: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    };

    post.applications.push(newApplication);
    const updatedPost = await post.save();

    return res.json(updatedPost);
  });
  console.log("Request body3:", req.body.coverLetter);
  console.log("Request file3:", req.body.resume);
});

const getApplicationResume = asyncHandler(async (req, res) => {
  const postId = req.params.pId;
  const userId = req.params.uId; // Assuming req.user._id contains the id of the current user

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

  const resume = application.resume;

  if (!resume || !resume.data) {
    res.status(404);
    throw new Error("Resume not found");
  }

  res.set('Content-Type', resume.contentType);
  return res.send(resume.data);
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

  const findMatchingPosts = asyncHandler(async (req, res) => {
    const userId = req.user.id; // Assuming req.user._id contains the id of the current user
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Find the resume for the current user
    const resume = await Resume.findOne({ userId: userId });

    // If no resume found, do nothing
    if (!resume) {
      return res.json([]);
    }

    // Get the skills and interests from the resume
    const { skills, interests } = resume;

    // Combine skills and interests and convert to lowercase
    const searchCriteria = [...skills, ...interests].map(skill => skill.toLowerCase());

    // Find posts that have at least one matching skill or interest
    const matchingPosts = await Post.aggregate([
      { $addFields: { lowerCaseSkills: { $map: { input: "$skills", as: "skill", in: { $toLower: "$$skill" } } } } },
      { $match: { lowerCaseSkills: { $in: searchCriteria } } },
      { $skip: skip },
      { $limit: limit },
      { $project: { lowerCaseSkills: 0 } }
    ]);

    return res.json(matchingPosts);
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

const searchPosts = asyncHandler(async (req, res) => {
  const searchTerm = req.query.q; // Assuming the search term is passed as a query parameter

  // Use a regular expression for case-insensitive and partial matching
  const regex = new RegExp(escapeRegex(searchTerm), 'gi');

  // Find posts that have the search term in the title or skills
  const matchingPosts = await Post.find({
    $or: [
      { title: regex },
      { skills: regex}
    ]
  });

  return res.json(matchingPosts);
});

// Function to escape special characters for use in a regular expression
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

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

const getMyApplications = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Find all posts
  const posts = await Post.find({});

  if (!posts) {
    res.status(404);
    throw new Error("Posts not found");
  }

  // Filter out other users' applications
  const userPosts = posts.map((post) => {
    const userApplications = post.applications.filter(
      (app) => app.user_id.toString() === userId.toString()
    );
    return { ...post._doc, applications: userApplications };
  });

  // Filter out posts that don't have any applications from the user
  const postsWithUserApplications = userPosts.filter(
    (post) => post.applications.length > 0
  );

  // If there are no posts with user applications, send a 404 status code and an error message
  if (postsWithUserApplications.length === 0) {
    res.status(404);
    throw new Error("No applications found");
  }

  return res.json(postsWithUserApplications);
});

const postsWithApps = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Assuming req.user._id contains the id of the current user

  // Find all posts of the current user
  const posts = await Post.find({ user_id: userId });

  if (!posts) {
    res.status(404);
    throw new Error("Posts not found");
  }

  // Filter out posts without applications
  const postsWithApplications = posts.filter(
    (post) => post.applications.length > 0
  );

  // Populate user details in applications
  const populatedPosts = await Promise.all(
    postsWithApplications.map(async (post) => {
      post = post.toObject();
      post.applications = await Promise.all(
        post.applications.map(async (app) => {
          const user = await User.findById(app.user_id).select(
            "firstName lastName email phone resume"
          );
          return {
            ...app,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            resume: user.resume,
          };
        })
      );
      return post;
    })
  );

  return res.json(populatedPosts);
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
  getApplicationResume,
  hiding,
  apply,
  accept,
  reject,
  searchPosts,
  findMatchingPosts,
  deleteApplication,
  getMyApplications,
  postsWithApps,
};
