import express from 'express';
import Employee from '../models/employee.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// HR/Admin: Upload salary slip
router.post('/:employeeId', authenticateToken, authorizeRoles('manager'), [
  body('month').isString(),
  body('year').isInt(),
  body('url').isString(),
], async (req, res) => {
  const emp = await Employee.findById(req.params.employeeId);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });
  emp.salarySlips.push({
    month: req.body.month,
    year: req.body.year,
    url: req.body.url,
    generatedAt: new Date(),
  });
  await emp.save();
  res.status(201).json(emp.salarySlips);
});

// HR/Admin: Upload document
router.post('/:employeeId/document', authenticateToken, authorizeRoles('manager'), [
  body('name').isString(),
  body('url').isString(),
], async (req, res) => {
  const emp = await Employee.findById(req.params.employeeId);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });
  emp.documents.push({
    name: req.body.name,
    url: req.body.url,
    uploadedAt: new Date(),
  });
  await emp.save();
  res.status(201).json(emp.documents);
});

export default router;
