import express from 'express';
import Assessment from '../models/assessment.js';
import Application from '../models/application.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Assign assessment to candidate
router.post('/', authenticateToken, authorizeRoles('manager'), [
  body('application').isMongoId(),
  body('type').isIn(['mcq', 'coding', 'custom']),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
], async (req, res) => {
  try {
    const { application, type, questions } = req.body;
    const assessment = new Assessment({ application, type, questions });
    await assessment.save();
    res.status(201).json(assessment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Candidate: Get assigned assessment
router.get('/candidate/:applicationId', authenticateToken, authorizeRoles('staff', 'manager'), async (req, res) => {
  const assessment = await Assessment.findOne({ application: req.params.applicationId });
  if (!assessment) return res.status(404).json({ error: 'Not found' });
  res.json(assessment);
});

// Candidate: Submit assessment answers
router.post('/:id/submit', authenticateToken, authorizeRoles('staff', 'manager'), async (req, res) => {
  const assessment = await Assessment.findById(req.params.id);
  if (!assessment) return res.status(404).json({ error: 'Not found' });
  assessment.answers = req.body.answers;
  assessment.submittedAt = new Date();
  // Optionally auto-score MCQ
  if (assessment.type === 'mcq') {
    let score = 0;
    assessment.answers.forEach((a, i) => {
      if (a.response === assessment.questions[i].answer) score += assessment.questions[i].maxScore || 1;
    });
    assessment.totalScore = score;
  }
  await assessment.save();
  res.json(assessment);
});

// Manager: Review/score assessment
router.put('/:id/review', authenticateToken, authorizeRoles('manager'), async (req, res) => {
  const assessment = await Assessment.findById(req.params.id);
  if (!assessment) return res.status(404).json({ error: 'Not found' });
  assessment.reviewed = true;
  assessment.totalScore = req.body.totalScore;
  await assessment.save();
  res.json(assessment);
});

export default router;
