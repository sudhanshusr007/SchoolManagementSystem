// controllers/student.controller.js
const Student = require("../models/student.model.js");
const jwt = require("jsonwebtoken"); // Add this line at the top
const bcrypt = require("bcryptjs");
// Fetch student details
// studentController.js
const getStudentDetails = async (req, res) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1]; // Bearer token

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode the token to get the user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const studentId = decoded.id; // Assuming 'id' is the key for user ID in the token

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update student details

const updateStudentDetails = async (req, res) => {
  try {
    const { email, phone, password, profile_picture } = req.body;
    let updateFields = { email, phone, profile_picture };

    // If a new password is provided, hash it before updating
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.user.id,
      updateFields,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student details updated", student: updatedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getStudentDetails,
  updateStudentDetails,
};
