const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Resume = require("../Models/ResumeModel");
const User = require("../Models/UserModel");

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


const addResume = async (req, res) => {
  if (!req.file) {
    res.status(400).send('No resume uploaded.');
    return;
  }

  const newResume = new Resume({
    userId: req.user.id, // Assuming `req.user` contains the authenticated user
    tags: [], // Add any tags here
    resume: {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
  });

  try {
    await newResume.save();
    res.status(201).send('Resume uploaded successfully.');
  } catch (error) {
    res.status(500).send('Error uploading resume: ' + error.message);
  }
};

module.exports = { addResume };
