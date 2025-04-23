import express from 'express';
import Billing from '../models/billing.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Foundation middleware for all billing routes
router.use(authenticateToken, authorizeRoles('admin', 'manager'), enforceTenantIsolation('tenant'), enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

// Create invoice
router.post('/', auditLogMiddleware('billing:create', req => ({ user: req.user, body: req.body })), [
  body('invoiceNumber').isString().notEmpty(),
  body('amount').isNumeric(),
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
    const billing = await Billing.create({ ...req.body, tenant: req.tenantId, dataResidency: req.tenantResidency });
    res.status(201).json(billing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all invoices for tenant
router.get('/', async (req, res) => {
  try {
    const invoices = await Billing.find({ tenant: req.tenantId });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update invoice
router.put('/:id', auditLogMiddleware('billing:update', req => ({ user: req.user, id: req.params.id, body: req.body })), async (req, res) => {
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
    const billing = await Billing.findOneAndUpdate({ _id: req.params.id, tenant: req.tenantId }, req.body, { new: true });
    if (!billing) return res.status(404).json({ error: 'Not found' });
    res.json(billing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete invoice
router.delete('/:id', auditLogMiddleware('billing:delete', req => ({ user: req.user, id: req.params.id })), async (req, res) => {
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
    await Billing.findOneAndDelete({ _id: req.params.id, tenant: req.tenantId });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
