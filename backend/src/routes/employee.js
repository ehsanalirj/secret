import express from 'express';
import Employee from '../models/employee.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Create employee
router.post(
  '/',
  authenticateToken,
  authorizeRoles('manager'),
  [
    body('name').isString().notEmpty(),
    body('email').isEmail(),
    body('role').isIn(['staff', 'manager']),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    },
  ],
  async (req, res) => {
    try {
      const { name, email, phone, role, department, startDate, status, salary, notes } = req.body;
      const exists = await Employee.findOne({ email });
      if (exists) return res.status(409).json({ error: 'Email already exists' });
      const employee = new Employee({
        name,
        email,
        phone,
        role,
        department,
        startDate,
        status,
        salary,
        notes,
        createdBy: req.user.id,
      });
      await employee.save();
      res.status(201).json(employee);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Get all employees
router.get('/', authenticateToken, authorizeRoles('manager', 'staff'), async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Update employee
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('manager'),
  async (req, res) => {
    try {
      const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!employee) return res.status(404).json({ error: 'Not found' });
      res.json(employee);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Delete employee
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('manager'),
  async (req, res) => {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;
