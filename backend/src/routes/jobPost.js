import express from 'express';
import JobPost from '../models/jobPost.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Create job post
router.post(
  '/',
  authenticateToken,
  authorizeRoles('manager'),
  [
    body('title').isString().notEmpty(),
    body('description').isString().notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    },
  ],
  async (req, res) => {
    try {
      const { title, description, department, requirements, location, status } = req.body;
      const job = new JobPost({
        title,
        description,
        department,
        requirements,
        location,
        status,
        postedBy: req.user.id,
      });
      await job.save();
      res.status(201).json(job);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// List all job posts (public, filterable)
router.get('/', async (req, res) => {
  const { status = 'open', department } = req.query;
  const filter = { status };
  if (department) filter.department = department;
  const jobs = await JobPost.find(filter).sort({ postedAt: -1 });
  res.json(jobs);
});

// Update job post
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('manager'),
  async (req, res) => {
    try {
      const job = await JobPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!job) return res.status(404).json({ error: 'Not found' });
      res.json(job);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Delete job post
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('manager'),
  async (req, res) => {
    try {
      const job = await JobPost.findByIdAndDelete(req.params.id);
      if (!job) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;
