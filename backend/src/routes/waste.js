import express from 'express';
import Waste from '../models/waste.js';
import Inventory from '../models/inventory.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Log food waste
router.post(
  '/',
  authenticateToken,
  authorizeRoles('manager', 'staff'),
  [
    body('inventoryItem').isMongoId(),
    body('quantity').isInt({ min: 1 }),
    body('reason').isIn(['expired', 'spoiled', 'overcooked', 'other']),
    body('destination').optional().isIn(['donation', 'compost', 'trash', 'other']),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    },
  ],
  async (req, res) => {
    try {
      const { inventoryItem, quantity, reason, destination, notes } = req.body;
      const inv = await Inventory.findById(inventoryItem);
      if (!inv) return res.status(404).json({ error: 'Inventory item not found' });
      const waste = new Waste({
        inventoryItem,
        quantity,
        reason,
        destination,
        notes,
        handledBy: req.user.id,
      });
      await waste.save();
      // Decrement inventory quantity
      inv.quantity = Math.max(0, inv.quantity - quantity);
      await inv.save();
      res.status(201).json(waste);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Get waste logs (with filters)
router.get('/', authenticateToken, async (req, res) => {
  const { from, to, reason } = req.query;
  let filter = {};
  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);
  }
  if (reason) filter.reason = reason;
  const logs = await Waste.find(filter).populate('inventoryItem').populate('handledBy', 'name email');
  res.json(logs);
});

export default router;
