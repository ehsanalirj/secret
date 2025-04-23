import express from 'express';
import Tenant from '../models/tenant.js';
import Branding from '../models/branding.js';
import Department from '../models/department.js';
import Plan from '../models/plan.js';
import FeatureFlag from '../models/featureFlag.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';

const router = express.Router();

// Enforce data residency for all tenant routes
router.use(enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

// Create tenant (admin only)
router.post('/', auditLogMiddleware('tenant:create', req => ({ user: req.user, body: req.body })), authenticateToken, authorizeRoles('admin'), async (req, res) => {
  if (req.isSandbox) return res.status(403).json({ error: 'Sandbox mode: destructive actions are not allowed.' });
  // Compliance: require tags/classification
  if (!req.body.complianceTags || !Array.isArray(req.body.complianceTags) || req.body.complianceTags.length === 0) {
    return res.status(400).json({ error: 'complianceTags are required' });
  }
  if (!req.body.dataClassification) {
    return res.status(400).json({ error: 'dataClassification is required' });
  }
  try {
    const { name, domain, country, plan, branding, departments } = req.body;
    const tenant = new Tenant({ name, domain, country, plan, departments });
    await tenant.save();
    if (branding) {
      await Branding.create({ ...branding, tenant: tenant._id });
    }
    res.status(201).json(tenant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tenants (TEMPORARILY PUBLIC for troubleshooting)
router.get('/', async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single tenant (admin or tenant manager)
router.get('/:id', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) return res.status(404).json({ error: 'Not found' });
    res.json(tenant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update tenant (admin or tenant manager)
router.put('/:id', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tenant) return res.status(404).json({ error: 'Not found' });
    res.json(tenant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete tenant (admin only)
router.delete('/:id', auditLogMiddleware('tenant:delete', req => ({ user: req.user, id: req.params.id })), authenticateToken, authorizeRoles('admin'), async (req, res) => {
  if (req.isSandbox) return res.status(403).json({ error: 'Sandbox mode: destructive actions are not allowed.' });
  // Compliance: block destructive ops if not approved
  const tenant = await Tenant.findById(req.params.id);
  if (tenant && tenant.complianceStatus !== 'approved') {
    return res.status(403).json({ error: 'Compliance status not approved.' });
  }
  try {
    await Tenant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
