import express from 'express';
import Branding from '../models/branding.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import enforceBrandingTenantIsolation from '../middleware/brandingTenantIsolation.js';
import enforceDataResidency from '../middleware/dataResidencyEnforcement.js';
import upload from '../utils/fileUpload.js';
import { auditLogMiddleware } from '../middleware/auditLogAction.js';
import path from 'path';

const router = express.Router();

// Enforce tenant isolation and data residency for all branding routes
router.use(authenticateToken, authorizeRoles('admin', 'manager'), enforceBrandingTenantIsolation(), enforceDataResidency(['EU', 'US', 'APAC', 'Other']));

// Upload logo for branding
router.post('/upload-logo', auditLogMiddleware('branding:uploadLogo', req => ({ user: req.user, file: req.file?.originalname })), upload.single('logo'), async (req, res) => {
  if (req.isSandbox) return res.status(403).json({ error: 'Sandbox mode: destructive actions are not allowed.' });
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // Return the file URL (relative path)
  const logoUrl = `/uploads/branding/${req.file.filename}`;
  res.status(200).json({ logoUrl });
});

// Create or update branding (admin/manager)
router.post('/', auditLogMiddleware('branding:create', req => ({ user: req.user, body: req.body })), async (req, res) => {
  if (req.isSandbox) return res.status(403).json({ error: 'Sandbox mode: destructive actions are not allowed.' });
  try {
    const { tenant, ...data } = req.body;
    let branding = await Branding.findOne({ tenant });
    if (branding) {
      branding = await Branding.findOneAndUpdate({ tenant }, data, { new: true });
    } else {
      branding = await Branding.create({ tenant, ...data });
    }
    res.status(201).json(branding);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update branding legal docs, theme, or custom domain (PATCH)
router.patch('/:tenant', auditLogMiddleware('branding:patch', req => ({ user: req.user, tenant: req.params.tenant, body: req.body })), async (req, res) => {
  if (req.isSandbox) return res.status(403).json({ error: 'Sandbox mode: destructive actions are not allowed.' });
  try {
    const { tenant } = req.params;
    const update = {};
    if (req.body.legalDocs) update['legalDocs'] = req.body.legalDocs;
    if (req.body.theme) update['theme'] = req.body.theme;
    if (req.body.customDomain) update['customDomain'] = req.body.customDomain;
    if (req.body.logoUrl) update['logoUrl'] = req.body.logoUrl;
    const branding = await Branding.findOneAndUpdate({ tenant }, update, { new: true });
    if (!branding) return res.status(404).json({ error: 'Not found' });
    res.json(branding);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get branding for tenant
router.get('/:tenant', async (req, res) => {
  try {
    const branding = await Branding.findOne({ tenant: req.params.tenant });
    if (!branding) return res.status(404).json({ error: 'Not found' });
    res.json(branding);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
