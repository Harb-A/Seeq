const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Resume = require("../Models/ResumeModel");
const User = require("../Models/UserModel");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const doResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400).send("No resume uploaded.");
    return;
  }
  const skillArray = req.body.skills.split(",").map((item) => item.trim());
  const resumeData = {
    userId: req.user.id,
    resume: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
    name: req.body.name,
    education: req.body.education,
    email: req.body.email,
    interests: req.body.interests,
    overview: req.body.overview,
    phone: req.body.phone,
    projects: req.body.projects,
    skills: skillArray,
  };

  console.log(resumeData);

  const resume = await Resume.findOneAndUpdate(
    { userId: req.user.id },
    resumeData,
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  if (resume) {
    res.status(201).send("Resume uploaded successfully.");
  } else {
    throw new Error("Error uploading resume");
  }
});

const getResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ userId: req.user.id }).select(
    "-resume"
  );

  if (resume) {
    res.json(resume);
  } else {
    res.status(404);
    throw new Error("Resume not found");
  }
});

module.exports = { doResume, getResume };
