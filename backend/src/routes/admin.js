// Admin auth routes (JWT)
import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const SECRET = process.env.JWT_SECRET || 'changeme';

// Demo: hardcoded admin for now
const DEMO_ADMIN = { username: 'admin', password: 'supersecret' };

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // In production, check hashed password from DB
  if (username === DEMO_ADMIN.username && password === DEMO_ADMIN.password) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to protect admin routes
function requireAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.role !== 'admin') throw new Error('Not admin');
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Example protected route
router.get('/me', requireAdmin, (req, res) => {
  res.json({ user: req.user });
});

export { router, requireAdmin };
