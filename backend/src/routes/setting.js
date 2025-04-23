import express from 'express';
import Setting from '../models/setting.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Middleware for all settings routes
router.use(authenticateToken, authorizeRoles('admin', 'manager', 'user'));

// Create or update a setting
router.post('/', auditLogMiddleware('setting:upsert', req => ({ user: req.user, body: req.body })), [
  body('key').isString().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
], async (req, res) => {
  try {
    const filter = {
      tenant: req.body.tenant || req.tenantId || null,
      user: req.body.user || req.user?._id || null,
      key: req.body.key
    };
    const update = {
      value: req.body.value,
      description: req.body.description,
      scope: req.body.scope || 'tenant',
      complianceTags: req.body.complianceTags,
      dataClassification: req.body.dataClassification,
      dataResidency: req.body.dataResidency
    };
    const setting = await Setting.findOneAndUpdate(filter, update, { new: true, upsert: true });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get settings (tenant/user/global)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.tenant) filter.tenant = req.query.tenant;
    if (req.query.user) filter.user = req.query.user;
    if (req.query.key) filter.key = req.query.key;
    const settings = await Setting.find(filter);
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a setting
router.delete('/:id', auditLogMiddleware('setting:delete', req => ({ user: req.user, id: req.params.id })), async (req, res) => {
  try {
    await Setting.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
