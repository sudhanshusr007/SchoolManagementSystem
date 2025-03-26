// controllers/teacher.controller.js
const Teacher = require('../models/teacher.model.js');

// Fetch teacher details
const getTeacherDetails = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update teacher details
const updateTeacherDetails = async (req, res) => {
  try {
    const { name, email, phone, classes_assigned, profile_picture } = req.body;

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.user.id,
      { name, email, phone, classes_assigned, profile_picture },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher details updated", teacher: updatedTeacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTeacherDetails,
  updateTeacherDetails,
};
