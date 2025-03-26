const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

// Admin Management
router.post('/create-admin', authMiddleware, roleMiddleware('SuperAdmin'), adminController.createAdmin);
router.get('/admin-details', adminController.getAdminDetails);
router.get('/get-all-admins', authMiddleware, roleMiddleware('Admin'), adminController.getAllAdmins);

// Student Management
router.post('/create-student', authMiddleware, roleMiddleware('Admin'), adminController.createStudent);
router.put('/update-student/:id', authMiddleware, roleMiddleware('Admin'), adminController.updateStudent);
router.delete('/delete-student/:id', authMiddleware, roleMiddleware('Admin'), adminController.deleteStudent);
router.get('/get-student/:id', authMiddleware, roleMiddleware('Admin'), adminController.getStudentDetails);
router.get('/get-all-students', authMiddleware, roleMiddleware('Admin'), adminController.getAllStudents);

// Teacher Management
router.post('/create-teacher', authMiddleware, roleMiddleware('Admin'), adminController.createTeacher);
router.put('/update-teacher/:id', authMiddleware, roleMiddleware('Admin'), adminController.updateTeacher);
router.delete('/delete-teacher/:id', authMiddleware, roleMiddleware('Admin'), adminController.deleteTeacher);
router.get('/get-teacher/:id', authMiddleware, roleMiddleware('Admin'), adminController.getTeacherDetails);
router.get('/get-all-teachers', authMiddleware, roleMiddleware('Admin'), adminController.getAllTeachers);

// Subject & Class Management (If needed in the future)
router.post('/assign-subject', authMiddleware, roleMiddleware('Admin'), adminController.assignSubject);
router.post('/assign-class', authMiddleware, roleMiddleware('Admin'), adminController.assignClass);

module.exports = router;
