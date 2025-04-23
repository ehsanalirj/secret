import express from 'express';
import Employee from '../models/employee.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Get own profile
router.get('/me', authenticateToken, authorizeRoles('staff', 'manager'), async (req, res) => {
  const emp = await Employee.findOne({ email: req.user.email });
  if (!emp) return res.status(404).json({ error: 'Not found' });
  res.json(emp);
});

// Update own profile (basic info)
router.put('/me', authenticateToken, authorizeRoles('staff', 'manager'), async (req, res) => {
  const emp = await Employee.findOneAndUpdate({ email: req.user.email }, req.body, { new: true });
  if (!emp) return res.status(404).json({ error: 'Not found' });
  res.json(emp);
});

// Get salary slips
router.get('/me/salary-slips', authenticateToken, authorizeRoles('staff', 'manager'), async (req, res) => {
  const emp = await Employee.findOne({ email: req.user.email });
  if (!emp) return res.status(404).json({ error: 'Not found' });
  res.json(emp.salarySlips || []);
});

// Get provident fund
router.get('/me/provident', authenticateToken, authorizeRoles('staff', 'manager'), async (req, res) => {
  const emp = await Employee.findOne({ email: req.user.email });
  if (!emp) return res.status(404).json({ error: 'Not found' });
  res.json(emp.providentFund || {});
});

// Get leaves
router.get('/me/leaves', authenticateToken, authorizeRoles('staff', 'manager'), async (req, res) => {
  const emp = await Employee.findOne({ email: req.user.email });
  if (!emp) return res.status(404).json({ error: 'Not found' });
  res.json(emp.leaves || []);
});

// Apply for leave
router.post('/me/leaves', authenticateToken, authorizeRoles('staff', 'manager'), [
  body('type').isString(),
  body('from').isISO8601(),
  body('to').isISO8601(),
  body('reason').isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
], async (req, res) => {
  const emp = await Employee.findOne({ email: req.user.email });
  if (!emp) return res.status(404).json({ error: 'Not found' });
  emp.leaves.push({ ...req.body, appliedAt: new Date() });
  await emp.save();
  res.status(201).json(emp.leaves);
});

// Get documents
router.get('/me/documents', authenticateToken, authorizeRoles('staff', 'manager'), async (req, res) => {
  const emp = await Employee.findOne({ email: req.user.email });
  if (!emp) return res.status(404).json({ error: 'Not found' });
  res.json(emp.documents || []);
});

// Contact HR (creates a support ticket, stub)
router.post('/me/contact-hr', authenticateToken, authorizeRoles('staff', 'manager'), [
  body('subject').isString(),
  body('message').isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
], async (req, res) => {
  // TODO: Save to support tickets collection
  res.status(201).json({ message: 'HR will contact you soon.' });
});

export default router;
