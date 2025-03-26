const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Student Routes
router.get('/profile/:id', authMiddleware, studentController.getStudentDetails);
router.put('/update-profile', authMiddleware, studentController.updateStudentDetails);

module.exports = router;
