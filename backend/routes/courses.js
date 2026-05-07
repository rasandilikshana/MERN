import express from 'express';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';

const router = express.Router();

// GET /api/courses — list all
router.get('/', async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json(courses);
});

// GET /api/courses/:id — one course
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

// POST /api/courses — create
router.post('/', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/courses/:id — update
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/courses/:id — remove course AND its lessons (cascade)
router.delete('/:id', async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  await Lesson.deleteMany({ courseId: req.params.id });
  res.json({ message: 'Course and its lessons deleted' });
});

// --- Nested: lessons under a course ---

// GET /api/courses/:id/lessons — list lessons of a course (sorted by order)
router.get('/:id/lessons', async (req, res) => {
  const lessons = await Lesson.find({ courseId: req.params.id }).sort({ order: 1 });
  res.json(lessons);
});

// POST /api/courses/:id/lessons — create a lesson under this course
router.post('/:id/lessons', async (req, res) => {
  try {
    const lesson = await Lesson.create({
      ...req.body,
      courseId: req.params.id, // forced from URL — never trust client to set it
    });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
