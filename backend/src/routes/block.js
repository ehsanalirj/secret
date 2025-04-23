// Block routes: CRUD, trending, most-used, top-rated
import express from 'express';
const router = express.Router();
import Block from '../models/block.js';
import Review from '../models/review.js';
import { suggestBlocks } from '../services/aiService.js';

// Get all blocks
router.get('/', async (req, res) => {
  const blocks = await Block.find().populate('reviews');
  res.json(blocks);
});

// Get trending blocks (installs >= 30 && < 50)
router.get('/trending', async (req, res) => {
  const trending = await Block.find({ installs: { $gte: 30, $lt: 50 } });
  res.json(trending);
});

// Get most used blocks (installs >= 50)
router.get('/most-used', async (req, res) => {
  const mostUsed = await Block.find({ installs: { $gte: 50 } });
  res.json(mostUsed);
});

// Get top rated blocks (rating >= 5 && installs >= 20)
router.get('/top-rated', async (req, res) => {
  const topRated = await Block.find({ rating: { $gte: 5 }, installs: { $gte: 20 } });
  res.json(topRated);
});

// Create new block
router.post('/', async (req, res) => {
  const block = new Block(req.body);
  await block.save();
  res.status(201).json(block);
});

// Update block
router.put('/:id', async (req, res) => {
  const block = await Block.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(block);
});

// Delete block
router.delete('/:id', async (req, res) => {
  await Block.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Get block by ID
router.get('/:id', async (req, res) => {
  const block = await Block.findById(req.params.id).populate('reviews');
  res.json(block);
});

// AI-powered block suggestions
router.get('/suggested', async (req, res) => {
  // In real use, pass userId from auth/session
  const userId = req.query.userId || null;
  const suggestions = await suggestBlocks(userId, Block);
  res.json(suggestions);
});

export default router;
