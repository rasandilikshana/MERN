import express from 'express';
import Lesson from '../models/Lesson.js';

const router = express.Router();

// GET /api/lessons/:id — one lesson, with its course populated (the "JOIN")
router.get('/:id', async (req, res) => {
  const lesson = await Lesson.findById(req.params.id).populate('courseId');
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  res.json(lesson);
});

// PUT /api/lessons/:id — update
router.put('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/lessons/:id
router.delete('/:id', async (req, res) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  res.json({ message: 'Lesson deleted' });
});

export default router;
