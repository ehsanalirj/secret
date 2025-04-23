// Review routes: CRUD, flagging, moderation, fetch by block
import express from 'express';
const router = express.Router();
import Review from '../models/review.js';
import Block from '../models/block.js';
import detectSpam from '../middleware/spamDetection.js';
import { sendFlaggedReviewEmail } from '../services/emailService.js';
import { requireRole } from '../middleware/roles.js';
import { analyzeSentiment } from '../services/aiService.js';

// Get all reviews (admin)
router.get('/', async (req, res) => {
  const reviews = await Review.find().populate('block');
  res.json(reviews);
});

// Get reviews for a block
router.get('/block/:blockId', async (req, res) => {
  const reviews = await Review.find({ block: req.params.blockId });
  res.json(reviews);
});

// Create review (with spam detection and AI sentiment analysis)
router.post('/', detectSpam, async (req, res) => {
  if (req.isSpam) {
    return res.status(400).json({ error: 'Spam detected', reason: req.spamReason });
  }
  const sentiment = analyzeSentiment(req.body.comment || '');
  const review = new Review({ ...req.body, sentiment });
  await review.save();
  // Add review to block
  await Block.findByIdAndUpdate(review.block, { $push: { reviews: review._id } });
  res.status(201).json({ ...review.toObject(), sentiment });
});

// Update review (admin/moderator)
router.put('/:id', async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(review);
});

// Delete review (admin/moderator)
router.delete('/:id', requireRole('admin'), async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Flag review (send email to admin)
router.post('/:id/flag', async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, { flagged: true, flagReason: req.body.reason }, { new: true });
  // Demo: send email to admin
  await sendFlaggedReviewEmail({ to: 'admin@yourplatform.com', review, reason: req.body.reason });
  res.json(review);
});

// Remove flag (admin/moderator)
router.post('/:id/unflag', requireRole('admin'), async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, { flagged: false, flagReason: '' }, { new: true });
  res.json(review);
});

// Remove review (admin/moderator)
router.post('/:id/remove', requireRole('admin'), async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, { removed: true }, { new: true });
  res.json(review);
});

export default router;
