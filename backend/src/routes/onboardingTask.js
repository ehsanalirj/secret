import express from 'express';
import OnboardingTask from '../models/onboardingTask.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Assign onboarding task
router.post('/', authenticateToken, authorizeRoles('manager'), [
  body('employee').isMongoId(),
  body('task').isString().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
], async (req, res) => {
  try {
    const { employee, task, dueDate, notes } = req.body;
    const t = new OnboardingTask({ employee, task, dueDate, notes });
    await t.save();
    res.status(201).json(t);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get tasks for an employee (employee self-service)
router.get('/employee', authenticateToken, authorizeRoles('staff', 'manager'), async (req, res) => {
  const tasks = await OnboardingTask.find({ employee: req.user.employeeId });
  res.json(tasks);
});

// Get all tasks (manager)
router.get('/', authenticateToken, authorizeRoles('manager'), async (req, res) => {
  const tasks = await OnboardingTask.find().populate('employee');
  res.json(tasks);
});

// Complete a task (employee)
router.put('/:id/complete', authenticateToken, authorizeRoles('staff', 'manager'), async (req, res) => {
  const task = await OnboardingTask.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  task.status = 'completed';
  task.completedAt = new Date();
  await task.save();
  res.json(task);
});

export default router;
