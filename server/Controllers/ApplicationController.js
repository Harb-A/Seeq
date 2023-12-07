const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Post = require("../Models/PostModel");
// const { post } = require("../Routes/AuthRoutes");
require("dotenv").config();



module.exports = { apply };