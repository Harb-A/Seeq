const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  resume: {
    file: String,
    resumeID: mongoose.Schema.Types.ObjectId
  },
});

module.exports = mongoose.model("User", userSchema);