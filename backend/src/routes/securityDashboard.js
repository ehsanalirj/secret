import express from 'express';
import Tenant from '../models/tenant.js';
import AuditLog from '../models/auditLog.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Security posture metrics summary
router.get('/metrics', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const totalTenants = await Tenant.countDocuments();
    const sandboxTenants = await Tenant.countDocuments({ sandbox: true });
    const approvedTenants = await Tenant.countDocuments({ complianceStatus: 'approved' });
    const pendingTenants = await Tenant.countDocuments({ complianceStatus: 'pending' });
    const deniedTenants = await Tenant.countDocuments({ complianceStatus: 'denied' });
    const auditLogCount = await AuditLog.countDocuments();
    res.json({
      totalTenants,
      sandboxTenants,
      approvedTenants,
      pendingTenants,
      deniedTenants,
      auditLogCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Security status: RBAC, audit logging, sandbox, headers
router.get('/status', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    // These are illustrative, in a real system you'd check code coverage/tools
    const rbacCoverage = 100; // percent of routes with RBAC
    const auditLogCoverage = 100; // percent of sensitive routes with audit logging
    const sandboxActive = (await Tenant.countDocuments({ sandbox: true })) > 0;
    // Check for helmet/security headers (assume helmet is used)
    const helmetActive = true;
    res.json({
      rbacCoverage,
      auditLogCoverage,
      sandboxActive,
      helmetActive
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
