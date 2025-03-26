// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // This will be a hashed password
    required: true,
  },
  role: {
    type: String,
    enum: ['SuperAdmin', 'Admin'],
    default: 'Admin',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
