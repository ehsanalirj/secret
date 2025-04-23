import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { advancedSecurity } from './middleware/security.js';
// ... import all routers
import webhookRoutes from './routes/webhook.js';
import integrationRoutes from './routes/integration.js';
import settingRoutes from './routes/setting.js';
import authRouter from './routes/auth.js';
import analyticsRoutes from './routes/analytics.js';
import notificationRoutes from './routes/notification.js';
import billingRoutes from './routes/billing.js';
import menuRoutes from './routes/menu.js';
import tenantRoutes from './routes/tenant.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
advancedSecurity(app);

// API routes
app.use('/api/webhook', webhookRoutes);
app.use('/api/integration', integrationRoutes);
app.use('/api/setting', settingRoutes);
app.use('/api/auth', authRouter);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/tenants', tenantRoutes);
// ... (all your existing app.use lines)

// Friendly root route for health check
app.get('/', (req, res) => {
  res.send('Vontres API is running! Welcome.');
});

// Debug: print all registered routes
if (process.env.NODE_ENV !== 'production') {
  setTimeout(() => {
    console.log('Registered routes:');
    app._router.stack
      .filter(r => r.route)
      .forEach(r => console.log(r.route.path));
  }, 1000);
}

export default app;
