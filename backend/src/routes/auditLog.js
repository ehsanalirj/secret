import express from 'express';
import AuditLog from '../models/auditLog.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Log action (internal use)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const log = new AuditLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get audit logs (admin, tenant manager)
router.get('/', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const { tenant, user, action } = req.query;
    const filter = {};
    if (tenant) filter.tenant = tenant;
    if (user) filter.user = user;
    if (action) filter.action = action;
    const logs = await AuditLog.find(filter).sort({ createdAt: -1 }).limit(1000);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export audit logs (admin only)
router.get('/export', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { tenant, user, action, format = 'json' } = req.query;
    const filter = {};
    if (tenant) filter.tenant = tenant;
    if (user) filter.user = user;
    if (action) filter.action = action;
    const logs = await AuditLog.find(filter).sort({ createdAt: -1 }).limit(5000);
    if (format === 'csv') {
      const fields = ['_id','tenant','user','action','details','device','ip','createdAt'];
      const csvRows = [fields.join(',')];
      for (const log of logs) {
        const row = fields.map(f => JSON.stringify(log[f] || '')).join(',');
        csvRows.push(row);
      }
      res.setHeader('Content-Type', 'text/csv');
      res.attachment('audit-logs.csv');
      return res.send(csvRows.join('\n'));
    }
    // Default: JSON
    res.setHeader('Content-Type', 'application/json');
    res.attachment('audit-logs.json');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
