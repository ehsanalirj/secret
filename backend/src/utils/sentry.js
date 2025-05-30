// Sentry integration for backend
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || 'development',
});

module.exports = Sentry;
