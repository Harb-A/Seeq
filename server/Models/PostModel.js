const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  cover_letter: String,
  accepted: Number
});

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: mongoose.Schema.Types.ObjectId,
  title: String,
  position: String,
  skills: [String],
  description: String,
  applications: [applicationSchema],
  hidden: Boolean
}, {versionKey: false});

module.exports = mongoose.model("Post", postSchema);