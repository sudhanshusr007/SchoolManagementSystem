// controllers/student.controller.js
const Student = require('../models/student.model.js');

// Fetch student details
const getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
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
    const { name, email, phone, subjects, profile_picture } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.user.id,
      { name, email, phone, subjects, profile_picture },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student details updated", student: updatedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getStudentDetails,
  updateStudentDetails,
};
