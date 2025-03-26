require('dotenv').config();
const jwt = require('jsonwebtoken');

// Replace this with the admin details from your DB
const admin = {
  _id: '67e144f11d67839bd461e7f1',
  name: 'John Doe',
  email: 'admin@kidscorner.com',
  role: 'Admin',
  password: "admin123"
};

// Generate JWT Token
const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log("Generated Token:", token);
