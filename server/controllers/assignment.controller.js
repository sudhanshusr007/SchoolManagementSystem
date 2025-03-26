// controllers/assignment.controller.js
const Assignment = require('../models/assignment.model');

// Create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, subject_id, teacher_id, due_date } = req.body;
    
    const newAssignment = new Assignment({
      title,
      description,
      subject_id,
      teacher_id,
      due_date,
      created_at: new Date(),
    });

    await newAssignment.save();
    res.status(201).json({ message: 'Assignment created successfully', data: newAssignment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating assignment', error });
  }
};

// Get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error });
  }
};

// Get assignment by ID
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignment', error });
  }
};

// Update assignment
exports.updateAssignment = async (req, res) => {
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json({ message: 'Assignment updated successfully', data: updatedAssignment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating assignment', error });
  }
};

// Delete assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!deletedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting assignment', error });
  }
};
