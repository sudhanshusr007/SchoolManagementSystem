// controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model.js');
const Teacher = require('../models/teacher.model.js');
const Student = require('../models/student.model.js');

// Login user (admin, teacher, student)
const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ message: "Email or phone is required" });
    }

    let user;

    if (email) {
      user = await Admin.findOne({ email }) || await Teacher.findOne({ email }) || await Student.findOne({ email });
    } else if (phone) {
      user = await Admin.findOne({ phone }) || await Teacher.findOne({ phone }) || await Student.findOne({ phone });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Register a new user (admin, teacher, student)
const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Admin.findOne({ email }) || await Teacher.findOne({ email }) || await Student.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    if (role === 'Admin') {
      newUser = new Admin({ name, email, phone, password: hashedPassword, role });
    } else if (role === 'Teacher') {
      newUser = new Teacher({ name, email, phone, password: hashedPassword });
    } else if (role === 'Student') {
      newUser = new Student({ name, email, phone, password: hashedPassword });
    }

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
  register,
};
