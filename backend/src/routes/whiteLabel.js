import express from 'express';
import WhiteLabel from '../models/whiteLabel.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Set or update white-label config (admin/manager)
router.post('/', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const { tenant, ...data } = req.body;
    let wl = await WhiteLabel.findOne({ tenant });
    if (wl) {
      wl = await WhiteLabel.findOneAndUpdate({ tenant }, data, { new: true });
    } else {
      wl = await WhiteLabel.create({ tenant, ...data });
    }
    res.status(201).json(wl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get white-label config for tenant
router.get('/:tenant', authenticateToken, async (req, res) => {
  try {
    const wl = await WhiteLabel.findOne({ tenant: req.params.tenant });
    if (!wl) return res.status(404).json({ error: 'Not found' });
    res.json(wl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
