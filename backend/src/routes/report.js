import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';

const router = express.Router();

// Foundation middleware for all report routes
router.use(authenticateToken, authorizeRoles('admin', 'manager'), enforceTenantIsolation('tenant'), enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

// Export report as CSV
router.post('/export/csv', auditLogMiddleware('report:export:csv', req => ({ user: req.user, tenant: req.tenantId, body: req.body })), async (req, res) => {
  try {
    const parser = new Parser();
    const csv = parser.parse(req.body.data || []);
    res.header('Content-Type', 'text/csv');
    res.attachment('report.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export report as PDF
router.post('/export/pdf', auditLogMiddleware('report:export:pdf', req => ({ user: req.user, tenant: req.tenantId, body: req.body })), async (req, res) => {
  try {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.attachment('report.pdf');
    doc.text(JSON.stringify(req.body.data, null, 2));
    doc.pipe(res);
    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
