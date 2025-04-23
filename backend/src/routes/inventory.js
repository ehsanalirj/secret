import express from 'express';
import Inventory from '../models/inventory.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Foundation middleware for all inventory routes
router.use(authenticateToken, authorizeRoles('admin', 'manager'), enforceTenantIsolation('tenant'), enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

// Create inventory item
router.post('/', auditLogMiddleware('inventory:create', req => ({ user: req.user, body: req.body })), [
  body('name').isString().notEmpty(),
  body('quantity').isInt({ min: 0 }),
  body('unit').isString().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
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
    const { name, category, quantity, unit, supplier, reorderThreshold } = req.body;
    const item = new Inventory({
      tenant: req.tenantId,
      name,
      category,
      quantity,
      unit,
      supplier,
      reorderThreshold,
      createdBy: req.user.id,
      dataResidency: req.tenantResidency
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all inventory items
router.get('/', async (req, res) => {
  const items = await Inventory.find();
  res.json(items);
});

// Update inventory item
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('manager', 'staff'),
  [
    body('quantity').optional().isInt({ min: 0 }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    },
  ],
  async (req, res) => {
    try {
      const item = await Inventory.findByIdAndUpdate(
        req.params.id,
        { ...req.body, lastUpdated: Date.now() },
        { new: true }
      );
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Delete inventory item
router.delete('/:id', auditLogMiddleware('inventory:delete', req => ({ user: req.user, id: req.params.id })), async (req, res) => {
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
    await Inventory.findOneAndDelete({ _id: req.params.id, tenant: req.tenantId });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
