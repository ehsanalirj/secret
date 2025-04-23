import express from 'express';
import Employee from '../models/employee.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Manager: Get all leave requests
router.get('/', authenticateToken, authorizeRoles('manager'), async (req, res) => {
  const employees = await Employee.find({ 'leaves.0': { $exists: true } });
  const leaveRequests = employees.flatMap(emp => (emp.leaves || []).map(l => ({ ...l.toObject(), employee: { _id: emp._id, name: emp.name, email: emp.email } })));
  res.json(leaveRequests);
});

// Manager: Approve/Reject leave
router.put('/:employeeId/:leaveIdx', authenticateToken, authorizeRoles('manager'), [
  body('status').isIn(['approved', 'rejected']),
], async (req, res) => {
  const emp = await Employee.findById(req.params.employeeId);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });
  const idx = parseInt(req.params.leaveIdx, 10);
  if (!emp.leaves[idx]) return res.status(404).json({ error: 'Leave not found' });
  emp.leaves[idx].status = req.body.status;
  emp.leaves[idx].approvedBy = req.user.id;
  await emp.save();
  res.json(emp.leaves[idx]);
});

// Employee: Cancel own leave
router.delete('/me/:leaveIdx', authenticateToken, authorizeRoles('staff', 'manager'), async (req, res) => {
  const emp = await Employee.findOne({ email: req.user.email });
  if (!emp) return res.status(404).json({ error: 'Not found' });
  const idx = parseInt(req.params.leaveIdx, 10);
  if (!emp.leaves[idx]) return res.status(404).json({ error: 'Leave not found' });
  emp.leaves.splice(idx, 1);
  await emp.save();
  res.json(emp.leaves);
});

export default router;
