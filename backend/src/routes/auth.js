import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

import { registerValidation, loginValidation } from '../middleware/validate.js';

// Register
router.post('/register', registerValidation, async (req, res) => {
  try {
    const { name, email, password, roles, tenant, dataResidency, permissions } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, roles, permissions, tenant, dataResidency });
    await user.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('REGISTER ERROR:', err); // Log the actual error
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.error('LOGIN FAIL: User not found for email', email);
      return res.status(401).json({ error: 'Invalid credentials: user not found' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.error('LOGIN FAIL: Password mismatch for email', email);
      return res.status(401).json({ error: 'Invalid credentials: password mismatch' });
    }
    const token = jwt.sign({ id: user._id, roles: user.roles, permissions: user.permissions, name: user.name, tenant: user.tenant ? String(user.tenant) : undefined, dataResidency: user.dataResidency }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, roles: user.roles, permissions: user.permissions, tenant: user.tenant ? String(user.tenant) : undefined, dataResidency: user.dataResidency } });
  } catch (err) {
    console.error('LOGIN FAIL: Exception', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Profile (protected)
import { authenticateToken } from '../middleware/auth.js';
router.get('/profile', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

export default router;
