import express from 'express';
import Webhook from '../models/webhook.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Foundation middleware for all webhook routes
router.use(authenticateToken, authorizeRoles('admin', 'manager'), enforceTenantIsolation('tenant'), enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

// Create webhook
router.post('/', auditLogMiddleware('webhook:create', req => ({ user: req.user, body: req.body })), [
  body('url').isURL(),
  body('event').isString().notEmpty(),
  body('secret').isString().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
], async (req, res) => {
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
    const webhook = await Webhook.create({ ...req.body, tenant: req.tenantId });
    res.status(201).json(webhook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all webhooks for tenant
router.get('/', async (req, res) => {
  try {
    const webhooks = await Webhook.find({ tenant: req.tenantId });
    res.json(webhooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update webhook
router.put('/:id', auditLogMiddleware('webhook:update', req => ({ user: req.user, id: req.params.id, body: req.body })), async (req, res) => {
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
    const webhook = await Webhook.findOneAndUpdate({ _id: req.params.id, tenant: req.tenantId }, req.body, { new: true });
    if (!webhook) return res.status(404).json({ error: 'Not found' });
    res.json(webhook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete webhook
router.delete('/:id', auditLogMiddleware('webhook:delete', req => ({ user: req.user, id: req.params.id })), async (req, res) => {
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
    await Webhook.findOneAndDelete({ _id: req.params.id, tenant: req.tenantId });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get webhook delivery logs (stub for future expansion)
router.get('/:id/logs', async (req, res) => {
  // In a real system, this would query a delivery log store
  res.json([]); // Placeholder
});

export default router;
