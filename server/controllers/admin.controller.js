const Admin = require("../models/admin.model.js");
const Student = require("../models/student.model.js");
const Teacher = require("../models/teacher.model.js");
const Subject = require("../models/subject.model.js");
const Assignment = require("../models/assignment.model.js");
const bcrypt = require("bcryptjs");

// Create a new admin (Only SuperAdmin can do this)
const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword, role });
    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch logged-in admin details
const getAdminDetails = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get all admins
const getAllAdmins = async (req, res) => {
  try {
    // Fetch all admins from the database
    const admins = await Admin.find(); // Replace with your Admin model
    res.status(200).json(admins); // Return the list of admins
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" }); // Return a server error message
  }
};

// Create a new student

const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      enrollment_number,
      profile_picture,
      subjects,
    } = req.body;

    if (!name || !email || !phone || !enrollment_number) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate phone number length (must be 10 digits)
    if (phone.length !== 10) {
      return res
        .status(400)
        .json({ message: "Phone number must be exactly 10 digits" });
    }

    // Check if a student with the same email, phone, or enrollment number already exists
    const existingStudent = await Student.findOne({
      $or: [{ email }, { phone }, { enrollment_number }],
    });

    if (existingStudent) {
      // Determine which field(s) are the same
      let errorMessage =
        "Duplicate student found. The following fields are already in use: ";
      const duplicateFields = [];

      if (existingStudent.email === email) duplicateFields.push("email");
      if (existingStudent.phone === phone) duplicateFields.push("phone");
      if (existingStudent.enrollment_number === enrollment_number)
        duplicateFields.push("enrollment number");

      errorMessage += duplicateFields.join(", ");

      return res.status(400).json({ message: errorMessage });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student if no duplicates found
    const newStudent = new Student({
      name,
      email,
      phone,
      password: hashedPassword, // Save the hashed password
      enrollment_number,
      profile_picture,
      subjects,
    });

    await newStudent.save();
    res
      .status(201)
      .json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update student details
const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single student
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

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new teacher
const createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      employee_id,
      profile_picture,
      classes_assigned,
    } = req.body;
    if (!name || !email || !phone || !employee_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTeacher = new Teacher({
      name,
      email,
      phone,
      password,
      employee_id,
      profile_picture,
      classes_assigned,
    });
    await newTeacher.save();
    res
      .status(201)
      .json({ message: "Teacher created successfully", teacher: newTeacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update teacher details
const updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTeacher)
      return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json({
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete teacher
const deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single teacher
const getTeacherDetails = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Assign a subject to a teacher
const assignSubject = async (req, res) => {
  try {
    const { teacher_id, subject_id } = req.body;
    await Teacher.findByIdAndUpdate(teacher_id, {
      $push: { subjects: subject_id },
    });
    res.status(200).json({ message: "Subject assigned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create an assignment
const createAssignment = async (req, res) => {
  try {
    const { title, description, teacher_id, subject_id, due_date } = req.body;
    const newAssignment = new Assignment({
      title,
      description,
      teacher_id,
      subject_id,
      due_date,
    });
    await newAssignment.save();
    res.status(201).json({
      message: "Assignment created successfully",
      assignment: newAssignment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get an assignment
const getAssignmentDetails = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    res.status(200).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an assignment
const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const assignClass = async (req, res) => {
  try {
    const { teacher_id, class_id } = req.body;

    if (!teacher_id || !class_id) {
      return res
        .status(400)
        .json({ message: "Missing required fields: teacher_id and class_id" });
    }

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacher_id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Check if the class exists
    const assignedClass = await Class.findById(class_id);
    if (!assignedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Assign the class to the teacher
    teacher.classes_assigned.push(class_id);
    await teacher.save();

    res.status(200).json({ message: "Class assigned successfully", teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAdmin,
  getAdminDetails,
  getAllAdmins,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentDetails,
  getAllStudents,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherDetails,
  getAllTeachers,
  assignSubject,
  createAssignment,
  getAssignmentDetails,
  deleteAssignment,
  assignClass,
};
