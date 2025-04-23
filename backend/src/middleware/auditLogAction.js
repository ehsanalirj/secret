// Middleware/helper to log sensitive actions to AuditLog
import AuditLog from '../models/auditLog.js';

export async function auditLogAction({ req, user, action, details = {} }) {
  try {
    await AuditLog.create({
      tenant: user.tenant,
      user: user._id,
      action,
      details,
      device: user.device,
      ip: req.ip,
    });
  } catch (err) {
    // Don't block main flow, but log error
    console.error('AuditLog error:', err);
  }
}

// Express middleware version for use in routes
export function auditLogMiddleware(action, detailsFn = (req) => ({})) {
  return async (req, res, next) => {
    await auditLogAction({ req, user: req.user, action, details: detailsFn(req) });
    next();
  };
}
