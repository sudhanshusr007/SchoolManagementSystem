// controllers/subject.controller.js
const Subject = require('../models/subject.model');

// Create a new subject
exports.createSubject = async (req, res) => {
  try {
    const { name, teacher_id, student_ids } = req.body;

    const newSubject = new Subject({
      name,
      teacher_id,
      student_ids,
    });

    await newSubject.save();
    res.status(201).json({ message: 'Subject created successfully', data: newSubject });
  } catch (error) {
    res.status(500).json({ message: 'Error creating subject', error });
  }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
};

// Get subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subject', error });
  }
};

// Assign students to subject
exports.assignStudentsToSubject = async (req, res) => {
  try {
    const { student_ids } = req.body;
    const subject = await Subject.findById(req.params.id);
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    subject.student_ids.push(...student_ids);
    await subject.save();

    res.status(200).json({ message: 'Students assigned to subject', data: subject });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning students to subject', error });
  }
};
