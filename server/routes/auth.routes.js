// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

// Registration and Login routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;
