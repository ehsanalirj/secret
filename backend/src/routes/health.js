import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Database status endpoint
router.get('/db', (req, res) => {
  const dbState = mongoose.connection.readyState;
  let state = 'unknown';
  if (dbState === 0) state = 'disconnected';
  if (dbState === 1) state = 'connected';
  if (dbState === 2) state = 'connecting';
  if (dbState === 3) state = 'disconnecting';
  res.json({ status: state, time: new Date().toISOString() });
});

export default router;
