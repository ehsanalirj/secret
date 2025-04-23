import rateLimit from 'express-rate-limit';

// Configurable per-tenant and per-user rate limiting
const getRateLimiter = (options = {}) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes
    max: (req, res) => {
      // Example: 1000 requests per tenant per window, 500 per user
      if (req.user && req.user.tenant) return options.tenantMax || 1000;
      if (req.user) return options.userMax || 500;
      return options.anonMax || 100;
    },
    keyGenerator: (req) => {
      if (req.user && req.user.tenant) return `tenant:${req.user.tenant}`;
      if (req.user) return `user:${req.user.id}`;
      return req.ip;
    },
    handler: (req, res) => {
      res.status(429).json({ error: 'Too many requests, please try again later.' });
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export default getRateLimiter;
