// models/Teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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
    unique: true,
  },
  employee_id: {
    type: String,
    required: true,
    unique: true,
  },
  profile_picture: {
    type: String,
    default: '', // URL for profile picture
  },
  classes_assigned: {
    type: [String], // List of class IDs the teacher is assigned to
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

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
