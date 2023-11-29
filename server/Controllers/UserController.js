const { Mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const { id } = require("date-fns/locale");
require("dotenv").config();

// route link (http://localhost:3000/users/getallusers)
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } });
    return res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
  }
});

// route link (http://localhost:3000/users/getposts)
const getPosts = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(userId);
    console.log(userId);
    const user = await User.findById(userId); // Assuming you have a User model defined

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // console.log(user)

    return res.json(user.Posts);
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { getUsers, getPosts };
