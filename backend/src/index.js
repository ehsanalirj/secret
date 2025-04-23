import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import { Server as SocketIO } from 'socket.io';
import mongoose from 'mongoose';
import app from './app.js';
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';

const server = http.createServer(app);
const io = new SocketIO(server, { cors: { origin: '*' } });
app.set('io', io);
global.io = io;
const PORT = process.env.PORT || 4000;

// --- Socket.IO Chat & Presence Events ---
const presenceUsers = new Map(); // socket.id -> { user, lastActive }

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle presence join
  socket.on('presence:join', ({ user }) => {
    presenceUsers.set(socket.id, { user, lastActive: Date.now() });
    broadcastPresence();
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    presenceUsers.delete(socket.id);
    broadcastPresence();
    console.log('User disconnected:', socket.id);
  });

  // Handle chat
  socket.on('chat:message', (msg) => {
    io.emit('chat:message', msg);
  });

  // Optionally: heartbeat to update activity
  socket.on('presence:ping', () => {
    if (presenceUsers.has(socket.id)) {
      presenceUsers.get(socket.id).lastActive = Date.now();
      broadcastPresence();
    }
  });
});

function broadcastPresence() {
  const userList = Array.from(presenceUsers.values()).map(({ user, lastActive }) => ({ user, lastActive }));
  io.emit('presence:update', userList);
}

// Middleware
import i18n from './middleware/i18n.js';
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(i18n);

// Advanced security (CSP, XSS, etc.)
import { advancedSecurity } from './middleware/security.js';
advancedSecurity(app);

// MongoDB connection and server start (skip in test mode)
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });


}

// Routes
import blockRoutes from './routes/block.js';
import reviewRoutes from './routes/review.js';
import analyticsRoutes from './routes/analytics.js';
import { router as adminRoutes, requireAdmin } from './routes/admin.js';
import pluginRoutes from './routes/plugin.js';
import authRoutes from './routes/auth.js';
import inventoryRoutes from './routes/inventory.js';
import wasteRoutes from './routes/waste.js';
import employeeRoutes from './routes/employee.js';
import jobPostRoutes from './routes/jobPost.js';
import applicationRoutes from './routes/application.js';
import interviewRoutes from './routes/interview.js';
app.use('/api/block', blockRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/plugin', pluginRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/job', jobPostRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/interview', interviewRoutes);
import employeePortalRoutes from './routes/employeePortal.js';
app.use('/api/employee-portal', employeePortalRoutes);
import onboardingTaskRoutes from './routes/onboardingTask.js';
app.use('/api/onboarding-task', onboardingTaskRoutes);
import assessmentRoutes from './routes/assessment.js';
app.use('/api/assessment', assessmentRoutes);
import leaveRoutes from './routes/leave.js';
app.use('/api/leave', leaveRoutes);
import salarySlipRoutes from './routes/salarySlip.js';
app.use('/api/salary-slip', salarySlipRoutes);

// --- Vontres Core Services ---
import tenantRoutes from './routes/tenant.js';
import roleRoutes from './routes/role.js';
import featureFlagRoutes from './routes/featureFlag.js';
import auditLogRoutes from './routes/auditLog.js';
import planRoutes from './routes/plan.js';
import departmentRoutes from './routes/department.js';
import webhookRoutes from './routes/webhook.js';
import integrationRoutes from './routes/integration.js';
import settingRoutes from './routes/setting.js';

app.use('/api/tenant', tenantRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/feature-flag', featureFlagRoutes);
app.use('/api/audit-log', auditLogRoutes);
app.use('/api/plan', planRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/integration', integrationRoutes);
app.use('/api/setting', settingRoutes);

import brandingRoutes from './routes/branding.js';
import whiteLabelRoutes from './routes/whiteLabel.js';
import organizationRoutes from './routes/organization.js';

app.use('/api/branding', brandingRoutes);
app.use('/api/white-label', whiteLabelRoutes);
app.use('/api/organization', organizationRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Socket.io real-time events (demo: users online, installs, reviews)
let onlineUsers = 0;
io.on('connection', (socket) => {
  onlineUsers++;
  io.emit('onlineUsers', onlineUsers);
  socket.on('disconnect', () => {
    onlineUsers = Math.max(0, onlineUsers - 1);
    io.emit('onlineUsers', onlineUsers);
  });
  socket.on('block:install', (data) => io.emit('block:install', data));
  socket.on('block:review', (data) => io.emit('block:review', data));
});

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
