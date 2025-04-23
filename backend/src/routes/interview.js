import express from 'express';
import Interview from '../models/interview.js';
import Application from '../models/application.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Schedule an interview
router.post(
  '/',
  authenticateToken,
  authorizeRoles('manager'),
  [
    body('application').isMongoId(),
    body('job').isMongoId(),
    body('candidate').isString().notEmpty(),
    body('scheduledAt').isISO8601(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    },
  ],
  async (req, res) => {
    try {
      const { application, job, candidate, scheduledAt, panel } = req.body;
      const interview = new Interview({
        application,
        job,
        candidate,
        scheduledAt,
        panel,
        createdBy: req.user.id,
      });
      await interview.save();
      res.status(201).json(interview);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Get all interviews (manager)
router.get('/', authenticateToken, authorizeRoles('manager'), async (req, res) => {
  const interviews = await Interview.find().populate('application').populate('job');
  res.json(interviews);
});

// Submit feedback (panelist)
router.post(
  '/:id/feedback',
  authenticateToken,
  [body('panelist').isString().notEmpty(), body('score').isInt({ min: 1, max: 10 })],
  async (req, res) => {
    try {
      const interview = await Interview.findById(req.params.id);
      if (!interview) return res.status(404).json({ error: 'Not found' });
      interview.feedback.push({
        panelist: req.body.panelist,
        score: req.body.score,
        notes: req.body.notes,
        submittedAt: new Date(),
      });
      await interview.save();
      res.json(interview);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;
