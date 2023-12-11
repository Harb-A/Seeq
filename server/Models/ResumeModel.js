const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  resume: {
    data: Buffer,
    contentType: String
  },
  Name: String,
  education: String,
  email: String,
  interests: String,
  overview: String,
  phone: String,
  projects: String,
  skills: [String]
}, { versionKey: false });

const Resume = mongoose.model('Resume', ResumeSchema);
module.exports = Resume;