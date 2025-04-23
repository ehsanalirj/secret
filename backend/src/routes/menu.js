import express from 'express';
import Menu from '../models/menu.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';

const router = express.Router();

// Foundation middleware for all menu routes
router.use(authenticateToken, authorizeRoles('admin', 'manager'), enforceTenantIsolation('tenant'), enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

// Create menu
router.post('/', auditLogMiddleware('menu:create', req => ({ user: req.user, body: req.body })), async (req, res) => {
  if (req.isSandbox) return res.status(403).json({ error: 'Sandbox mode: destructive actions are not allowed.' });
  // Compliance: block if not approved
  if (req.user && req.user.tenant) {
    const { default: Tenant } = await import('../models/tenant.js');
    const tenant = await Tenant.findById(req.user.tenant);
    if (tenant && tenant.complianceStatus !== 'approved') {
      return res.status(403).json({ error: 'Compliance status not approved.' });
    }
  }
  try {
    const menu = await Menu.create({ ...req.body, tenant: req.tenantId, dataResidency: req.tenantResidency });
    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all menus for tenant
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find({ tenant: req.tenantId });
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update menu
router.put('/:id', auditLogMiddleware('menu:update', req => ({ user: req.user, id: req.params.id, body: req.body })), async (req, res) => {
  if (req.isSandbox) return res.status(403).json({ error: 'Sandbox mode: destructive actions are not allowed.' });
  // Compliance: block if not approved
  if (req.user && req.user.tenant) {
    const { default: Tenant } = await import('../models/tenant.js');
    const tenant = await Tenant.findById(req.user.tenant);
    if (tenant && tenant.complianceStatus !== 'approved') {
      return res.status(403).json({ error: 'Compliance status not approved.' });
    }
  }
  try {
    const menu = await Menu.findOneAndUpdate({ _id: req.params.id, tenant: req.tenantId }, req.body, { new: true });
    if (!menu) return res.status(404).json({ error: 'Not found' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete menu
router.delete('/:id', auditLogMiddleware('menu:delete', req => ({ user: req.user, id: req.params.id })), async (req, res) => {
  if (req.isSandbox) return res.status(403).json({ error: 'Sandbox mode: destructive actions are not allowed.' });
  // Compliance: block if not approved
  if (req.user && req.user.tenant) {
    const { default: Tenant } = await import('../models/tenant.js');
    const tenant = await Tenant.findById(req.user.tenant);
    if (tenant && tenant.complianceStatus !== 'approved') {
      return res.status(403).json({ error: 'Compliance status not approved.' });
    }
  }
  try {
    await Menu.findOneAndDelete({ _id: req.params.id, tenant: req.tenantId });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
