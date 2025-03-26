// models/Assignment.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher_id: {
    type: String,
    required: true, // Foreign Key (Teacher ID)
  },
  subject_id: {
    type: String,
    required: true, // Foreign Key (Subject ID)
  },
  due_date: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
