// Import required dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/error.middleware');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const studentRoutes = require('./routes/student.routes');
const teacherRoutes = require('./routes/teacher.routes');

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(express.json());  // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data

// Set up routes
app.use('/api/auth', authRoutes);  // Authentication routes (login, register)
app.use('/api/admin', adminRoutes);  // Admin-specific routes
app.use('/api/student', studentRoutes);  // Student-specific routes
app.use('/api/teacher', teacherRoutes);  // Teacher-specific routes

// Global Error Handler
app.use(errorHandler);

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);  // Exit the process if database connection fails
  }
};

startServer();
