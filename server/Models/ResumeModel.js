const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  resume: { // Changed from 'pdf' to 'resume'
    data: Buffer,
    contentType: String
  }
});

const Resume = mongoose.model('Resume', ResumeSchema);
module.exports = Resume;