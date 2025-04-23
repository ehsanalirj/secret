// Analytics routes: fetch, update, export CSV/JSON/PDF
import express from 'express';
import Analytics from '../models/analytics.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceTenantIsolation from '../middleware/tenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';

const router = express.Router();

// Foundation middleware for all analytics routes
router.use(authenticateToken, authorizeRoles('admin', 'manager'), enforceTenantIsolation('tenant'), enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

// Get analytics for current tenant, with optional filters
router.get('/', async (req, res) => {
  const { start, end, type } = req.query;
  let filter = { tenant: req.tenantId };
  if (start || end) {
    filter.createdAt = {};
    if (start) filter.createdAt.$gte = new Date(start);
    if (end) filter.createdAt.$lte = new Date(end);
  }
  let analytics = await Analytics.find(filter);
  if (type) {
    analytics = analytics.filter(a => a.events.some(e => e.type === type));
  }
  res.json(analytics);
});

// Get analytics for a block (tenant-isolated)
router.get('/block/:blockId', async (req, res) => {
  const analytics = await Analytics.findOne({ block: req.params.blockId, tenant: req.tenantId });
  res.json(analytics);
});

// Update analytics for a block (e.g., increment installs, add event/metric)
router.post('/block/:blockId', auditLogMiddleware('analytics:update', req => ({ user: req.user, blockId: req.params.blockId, body: req.body })), async (req, res) => {
  if (req.isSandbox) return res.status(403).json({ error: 'Sandbox mode: destructive actions are not allowed.' });
  // Compliance: block if not approved
  if (req.user && req.user.tenant) {
    const { default: Tenant } = await import('../models/tenant.js');
    const tenant = await Tenant.findById(req.user.tenant);
    if (tenant && tenant.complianceStatus !== 'approved') {
      return res.status(403).json({ error: 'Compliance status not approved.' });
    }
  }
  let analytics = await Analytics.findOne({ block: req.params.blockId, tenant: req.tenantId });
  if (!analytics) {
    analytics = new Analytics({ block: req.params.blockId, tenant: req.tenantId, dataResidency: req.tenantResidency });
  }
  if (typeof req.body.installs === 'number') {
    analytics.installs = req.body.installs;
  }
  if (Array.isArray(req.body.ratings)) {
    analytics.ratings = req.body.ratings;
  }
  if (Array.isArray(req.body.events)) {
    analytics.events = req.body.events;
  }
  await analytics.save();
  res.json(analytics);
});

// Export analytics as CSV
router.get('/export/csv', async (req, res) => {
  const analytics = await Analytics.find().populate('block');
  const data = analytics.map(a => ({
    block: a.block ? a.block.name : '',
    installs: a.installs,
    avgRating: a.ratings && a.ratings.length ? (a.ratings.reduce((s, r) => s + r, 0) / a.ratings.length).toFixed(2) : 0,
    events: (a.events || []).join(';')
  }));
  const parser = new Parser({ fields: ['block', 'installs', 'avgRating', 'events'] });
  const csv = parser.parse(data);
  res.header('Content-Type', 'text/csv');
  res.attachment('analytics.csv');
  res.send(csv);
});

// Export analytics as PDF
router.get('/export/pdf', async (req, res) => {
  const analytics = await Analytics.find().populate('block');
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=analytics.pdf');
  doc.pipe(res);
  doc.fontSize(18).text('Block Analytics Report', { align: 'center' });
  doc.moveDown();
  analytics.forEach(a => {
    doc.fontSize(12).text(`Block: ${a.block ? a.block.name : ''}`);
    doc.text(`Installs: ${a.installs}`);
    doc.text(`Avg Rating: ${a.ratings && a.ratings.length ? (a.ratings.reduce((s, r) => s + r, 0) / a.ratings.length).toFixed(2) : 0}`);
    doc.text(`Events: ${(a.events || []).join('; ')}`);
    doc.moveDown();
  });
  doc.end();
});

// Export analytics as JSON
router.get('/export/json', async (req, res) => {
  const analytics = await Analytics.find().populate('block');
  res.json(analytics);
});

export default router;
