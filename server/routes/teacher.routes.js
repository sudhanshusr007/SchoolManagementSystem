const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');
const assignmentController = require('../controllers/assignment.controller'); // Importing assignment controller
const { authMiddleware } = require('../middlewares/auth.middleware');

// Teacher Routes
router.get('/profile', authMiddleware, teacherController.getTeacherDetails); 
router.put('/update-profile', authMiddleware, teacherController.updateTeacherDetails);

// Assignment Routes
router.get('/assignments', authMiddleware, assignmentController.getAllAssignments); // Get all assignments
router.get('/assignment/:id', authMiddleware, assignmentController.getAssignmentById); // Get a single assignment by ID
router.post('/create-assignment', authMiddleware, assignmentController.createAssignment); // Create new assignment
router.put('/update-assignment/:id', authMiddleware, assignmentController.updateAssignment); // Update an assignment
router.delete('/delete-assignment/:id', authMiddleware, assignmentController.deleteAssignment); // Delete an assignment

module.exports = router;
