// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  enrollment_number: {
    type: String,
    required: true,
    unique: true,
  },
  profile_picture: {
    type: String,
    default: '', // URL for profile picture
  },
  subjects: {
    type: [String], // Array of enrolled subject IDs
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
