const { Mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
require("dotenv").config();
const express = require("express");
//return all users that are noq the current user
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user.id } });
  return res.json(users);
});

//return current user
const getUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
});

const getPost = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  pId = req.params.pId;
  console.log(pId);
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  for (let i = 0; i < user.posts.length; i++) {
    console.log(user.posts[i].pId == pId);
    console.log("current post id: " + user.posts[i].pId);
    console.log("given id: " + pId);
    if (user.posts[i].pId == pId) {
      console.log(user.posts[i].pId);
      return res.json(user.posts[i]);
    }
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const fields = req.body;

  const user = await User.findById(userId);

  // If a new password is provided, check the current password first
  if (fields.password && fields.currentPassword) {
    const isMatch = await bcrypt.compare(fields.currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password before saving
    fields.password = await bcrypt.hash(fields.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, fields, { new: true });

  return res.json(updatedUser);
});

module.exports = { getUsers, getUser, getPost, updateUser };
