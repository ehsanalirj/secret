import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';
import RBAC from '../../../shared/rbac';

const router = express.Router();

// Foundation middleware for all RBAC routes
router.use(authenticateToken, authorizeRoles('admin', 'manager'), enforceTenantIsolation('tenant'), enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

// Get all roles/permissions for tenant
router.get('/roles', auditLogMiddleware('rbac:roles:list', req => ({ user: req.user, tenant: req.tenantId })), async (req, res) => {
  try {
    const roles = await RBAC.getRoles(req.tenantId);
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update role permissions
router.put('/roles/:role', auditLogMiddleware('rbac:role:update', req => ({ user: req.user, tenant: req.tenantId, role: req.params.role, body: req.body })), async (req, res) => {
  try {
    const updated = await RBAC.updateRolePermissions(req.tenantId, req.params.role, req.body.permissions);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign role to user
router.post('/assign', auditLogMiddleware('rbac:assign', req => ({ user: req.user, tenant: req.tenantId, body: req.body })), async (req, res) => {
  try {
    const { userId, role } = req.body;
    const result = await RBAC.assignRole(req.tenantId, userId, role);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
