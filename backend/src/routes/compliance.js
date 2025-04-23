import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';
import { checkCompliance, exportComplianceReport } from '../../../shared/compliance';

const router = express.Router();

// Foundation middleware for all compliance routes
router.use(authenticateToken, authorizeRoles('admin', 'manager'), enforceTenantIsolation('tenant'), enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

// Run compliance check for tenant
router.get('/check', auditLogMiddleware('compliance:check', req => ({ user: req.user, tenant: req.tenantId })), async (req, res) => {
  try {
    const result = await checkCompliance(req.tenantId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export compliance report for tenant
router.get('/export', auditLogMiddleware('compliance:export', req => ({ user: req.user, tenant: req.tenantId })), async (req, res) => {
  try {
    const report = await exportComplianceReport(req.tenantId);
    res.setHeader('Content-Type', 'application/json');
    res.attachment('compliance-report.json');
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
