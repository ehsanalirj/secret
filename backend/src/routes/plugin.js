// Plugins API: register, list, manage plugins
import express from 'express';
import Plugin from '../models/plugin.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';

const router = express.Router();

// Foundation middleware for all plugin routes
router.use(authenticateToken, authorizeRoles('admin', 'manager'), enforceTenantIsolation('tenant'), enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

const plugins = [];

// Register plugin
router.post('/register', auditLogMiddleware('plugin:create', req => ({ user: req.user, body: req.body })), async (req, res) => {
  if (req.isSandbox) return res.status(403).json({ error: 'Sandbox mode: destructive actions are not allowed.' });
  // Compliance: block if not approved
  if (req.user && req.user.tenant) {
    const { default: Tenant } = await import('../models/tenant.js');
    const tenant = await Tenant.findById(req.user.tenant);
    if (tenant && tenant.complianceStatus !== 'approved') {
      return res.status(403).json({ error: 'Compliance status not approved.' });
    }
  }
  const { name, author, url } = req.body;
  if (!name || !author || !url) return res.status(400).json({ error: 'Missing fields' });
  plugins.push({ name, author, url, registeredAt: new Date() });
  res.status(201).json({ message: 'Plugin registered', plugin: { name, author, url } });
});

// List plugins
router.get('/', (req, res) => {
  res.json(plugins);
});

export default router;
