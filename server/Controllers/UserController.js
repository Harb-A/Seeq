const { Mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
require("dotenv").config();

// route link (http://localhost:4000/users/)
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } });
    return res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
  }
});

// route link (http://localhost:3000/users/getposts)
// const getPosts = asyncHandler(async (req, res) => {
//   try {
//     console.log("testing params");
//     console.log("hello there test(" + req.params);
//     const userId = req.user.id;
//     // console.log(userId);
//     // console.log(userId);
//     const user = await User.findById(userId); // Assuming you have a User model defined
    
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // console.log(user)
    
//     return res.json(user.posts);
//   } catch (error) {
//     console.error("Error retrieving user:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

const getPost = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    pId = req.params.pId;
    console.log(pId);
    // console.log(userId);
    // console.log(userId);
    const user = await User.findById(userId); // Assuming you have a User model defined

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // // console.log(user)
    for (let i = 0; i < user.posts.length; i++){
      // console.log(user.posts[0]);
      console.log(user.posts[i].pId == pId);
      console.log("current post id: " +user.posts[i].pId)
      console.log("given id: " +pId)
      if(user.posts[i].pId == pId){
        console.log(user.posts[i].pId);
        return res.json(user.posts[i]);
      };
    };
    // console.log(user.posts[pId]);
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = { getUsers, getPost};
