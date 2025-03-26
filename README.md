# SchoolManagementSystem

SchoolManagementSystem is a School-level ERP that provides distinct portals for Admin, Students, and Teachers to manage various school-related activities effectively.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Introduction

SchoolManagementSystem is designed to streamline the management of students, teachers, and administrative tasks within a school. The system is built using the MERN stack (MongoDB, Express, React, Node.js) and provides separate portals for Admin, Teachers, and Students.

## Features

- **Admin Portal**: Admins can register students, teachers, and other admins. They have full control over user management.
  
- **Student Portal**: Students can view their personal information, class schedules, and submit assignments.
  
- **Teacher Portal**: Teachers can view student records, assign homework, and manage their schedules.

- **User Authentication**: Role-based authentication for Admin, Teacher, and Student access.

## Setup Instructions

1. **Install Dependencies**:
   First, install the necessary dependencies for the front-end portals and server:
   ```bash
   npm install
   ```

2. **Start the Front-End Portals**:
   To run all portals (Admin, Student, Teacher), use the following command:
   ```bash
   npm run dev
   ```

3. **Start the Server**:
   To run the back-end server, use the following command:
   ```bash
   npm install
   npm start
   ```

## Technologies Used

The system is built using the following technologies:

- **MongoDB**: NoSQL database for storing user data and records.
- **Express**: Web framework for Node.js used for building the server-side application.
- **React**: Front-end JavaScript library used for building the user interfaces for the portals.
- **Node.js**: JavaScript runtime used for server-side scripting.
- **JWT (JSON Web Token)**: Used for user authentication and managing sessions.

## Contributing

To contribute to this project:

1. **Fork the Repository**: Fork the repository by clicking the "Fork" button at the top right of this page.

2. **Clone Your Fork**: Clone your fork to your local machine:
   ```bash
   git clone https://github.com/sudhanshusr007/SchoolManagementSystem.git
   ```

3. **Create a New Branch**:
   ```bash
   git checkout -b feature-branch-name
   ```

4. **Make Your Changes**: Implement your feature or bug fix.

5. **Commit Your Changes**:
   ```bash
   git commit -m 'Add a feature or fix a bug'
   ```

6. **Push to Your Fork**:
   ```bash
   git push origin feature-branch-name
   ```

7. **Submit a Pull Request**: Go to the original repository, click on "Pull Requests," and create a new pull request to merge your changes.
