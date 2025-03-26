// models/Subject.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teacher_id: {
    type: String,
    required: true, // Foreign Key (Teacher ID)
  },
  student_ids: {
    type: [String], // List of enrolled student IDs
    default: [],
  },
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;
