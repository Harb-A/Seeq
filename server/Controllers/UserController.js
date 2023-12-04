const { Mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
require("dotenv").config();
const express = require("express");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user.id } });
  return res.json(users);
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

  // If a new password is provided, hash it before saving
  if (fields.password) {
    fields.password = await bcrypt.hash(fields.password);
  }

  const user = await User.findByIdAndUpdate(userId, fields, { new: true });

  return res.json(user);
});

module.exports = { getUsers, getPost, updateUser };
