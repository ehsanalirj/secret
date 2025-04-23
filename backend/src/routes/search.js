import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import User from '../models/user.js';
import Order from '../models/order.js';
import Menu from '../models/menu.js';
import CRM from '../models/crm.js';
import Billing from '../models/billing.js';
import Analytics from '../models/analytics.js';
import Notification from '../models/notification.js';
import Integration from '../models/integration.js';

const router = express.Router();

// Global search endpoint (admin/manager)
router.get('/', authenticateToken, authorizeRoles('admin', 'manager'), enforceTenantIsolation('tenant'), enforceDataResidency(['EU', 'US', 'APAC', 'Other']), async (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.status(400).json({ error: 'Query too short' });
  const tenant = req.tenantId;
  const regex = new RegExp(q, 'i');
  try {
    const [users, orders, menus, crms, billings, analytics, notifications, integrations] = await Promise.all([
      User.find({ tenant, $or: [{ name: regex }, { email: regex }] }).limit(10),
      Order.find({ tenant, $or: [{ orderNumber: regex }, { status: regex }] }).limit(10),
      Menu.find({ tenant, name: regex }).limit(10),
      CRM.find({ tenant, $or: [{ name: regex }, { email: regex }] }).limit(10),
      Billing.find({ tenant, $or: [{ invoiceNumber: regex }, { status: regex }] }).limit(10),
      Analytics.find({ tenant, block: regex }).limit(10),
      Notification.find({ tenant, message: regex }).limit(10),
      Integration.find({ tenant, name: regex }).limit(10),
    ]);
    res.json({ users, orders, menus, crms, billings, analytics, notifications, integrations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
