import express from 'express';
import Order from '../models/order.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';

const router = express.Router();

// Foundation middleware for all order routes
router.use(authenticateToken, authorizeRoles('admin', 'manager'), enforceTenantIsolation('tenant'), enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

// Create order
router.post('/', auditLogMiddleware('order:create', req => ({ user: req.user, body: req.body })), async (req, res) => {
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
    const order = await Order.create({ ...req.body, tenant: req.tenantId, dataResidency: req.tenantResidency });
    // Emit real-time event for new order
    if (req.app.get('io')) {
      req.app.get('io').emit('order:new', order);
    } else if (global.io) {
      global.io.emit('order:new', order);
    }
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders for tenant
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ tenant: req.tenantId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order
router.put('/:id', auditLogMiddleware('order:update', req => ({ user: req.user, id: req.params.id, body: req.body })), async (req, res) => {
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
    const order = await Order.findOneAndUpdate({ _id: req.params.id, tenant: req.tenantId }, req.body, { new: true });
    if (!order) return res.status(404).json({ error: 'Not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete order
router.delete('/:id', auditLogMiddleware('order:delete', req => ({ user: req.user, id: req.params.id })), async (req, res) => {
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
    await Order.findOneAndDelete({ _id: req.params.id, tenant: req.tenantId });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
