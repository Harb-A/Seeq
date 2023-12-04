const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  resume: {
    file: String,
    resumeID: mongoose.Schema.Types.ObjectId
  },
},{versionKey: false});

module.exports = mongoose.model("User", userSchema);