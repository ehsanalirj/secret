import express from 'express';
import Application from '../models/application.js';
import JobPost from '../models/jobPost.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Public: Apply to a job
router.post(
  '/',
  [
    body('job').isMongoId(),
    body('name').isString().notEmpty(),
    body('email').isEmail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    },
  ],
  async (req, res) => {
    try {
      const { job, name, email, phone, resumeUrl, answers } = req.body;
      const jobDoc = await JobPost.findById(job);
      if (!jobDoc || jobDoc.status !== 'open') return res.status(404).json({ error: 'Job not found or closed' });
      const app = new Application({ job, name, email, phone, resumeUrl, answers });
      await app.save();
      res.status(201).json(app);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Manager: Get all applications (with job info)
router.get('/', authenticateToken, authorizeRoles('manager'), async (req, res) => {
  const apps = await Application.find().populate('job');
  res.json(apps);
});

// Manager: Update application status
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('manager'),
  [body('status').isIn(['applied','shortlisted','interview','offered','hired','rejected'])],
  async (req, res) => {
    try {
      const app = await Application.findById(req.params.id);
      if (!app) return res.status(404).json({ error: 'Not found' });
      app.status = req.body.status;
      app.history.push({ status: req.body.status, by: req.user.id });
      await app.save();
      res.json(app);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;
