import express from 'express';
import Department from '../models/department.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Create department (admin or tenant manager)
router.post('/', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const { name, tenant, roles } = req.body;
    const department = new Department({ name, tenant, roles });
    await department.save();
    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get departments (admin or tenant manager)
router.get('/', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const { tenant } = req.query;
    const filter = {};
    if (tenant) filter.tenant = tenant;
    const departments = await Department.find(filter).populate('roles');
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update department (admin or tenant manager)
router.put('/:id', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!department) return res.status(404).json({ error: 'Not found' });
    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete department (admin or tenant manager)
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
