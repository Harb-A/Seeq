const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  Resume: {
    file: String,
    resumeID: mongoose.Schema.Types.ObjectId
  },
  Posts: {
    title: String,
    information: String,
    applications: [{
      user_id: mongoose.Schema.Types.ObjectId,
      cover_letter: String
    }]
  }
});

module.exports = mongoose.model("User", userSchema);