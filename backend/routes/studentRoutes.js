const express = require('express');
const router = express.Router();

// Mock data (replace with database queries in a real application)
const students = [
  { id: 1, name: 'John Doe', grade: 'A' },
  { id: 2, name: 'Jane Smith', grade: 'B' },
];

// Get all students
router.get('/', (req, res) => {
  res.json(students);
});

// Get a specific student by ID
router.get('/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

// Add a new student
router.post('/', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    grade: req.body.grade
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

module.exports = router;