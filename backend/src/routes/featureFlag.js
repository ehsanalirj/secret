import express from 'express';
import FeatureFlag from '../models/featureFlag.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';

const router = express.Router();

// Enforce tenant isolation and data residency for all feature flag routes
router.use(authenticateToken, authorizeRoles('admin', 'manager'), enforceTenantIsolation('tenant'), enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

// Create feature flag (admin or tenant manager)
router.post('/', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const flag = new FeatureFlag(req.body);
    await flag.save();
    res.status(201).json(flag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all feature flags (admin or tenant manager)
router.get('/', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const { tenant, country, plan, department } = req.query;
    const filter = {};
    if (tenant) filter.tenant = tenant;
    if (country) filter.country = country;
    if (plan) filter.plan = plan;
    if (department) filter.department = department;
    const flags = await FeatureFlag.find(filter);
    res.json(flags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update feature flag (admin or tenant manager)
router.put('/:id', auditLogMiddleware('featureFlag:update', req => ({ id: req.params.id, body: req.body })), async (req, res) => {
  if (req.isSandbox) return res.status(403).json({ error: 'Sandbox mode: destructive actions are not allowed.' });
  try {
    const flag = await FeatureFlag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!flag) return res.status(404).json({ error: 'Not found' });
    res.json(flag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete feature flag (admin or tenant manager)
router.delete('/:id', auditLogMiddleware('featureFlag:delete', req => ({ id: req.params.id })), async (req, res) => {
  if (req.isSandbox) return res.status(403).json({ error: 'Sandbox mode: destructive actions are not allowed.' });
  try {
    await FeatureFlag.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
