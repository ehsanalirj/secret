// Shared Audit Logger utility for Vontres
// Usage: import { logAuditEvent } from './auditLogger';

function logAuditEvent({ tenantId, userId, action, resource, meta = {} }) {
  // For now, just print. In production: write to DB, queue, or file.
  const event = {
    timestamp: new Date().toISOString(),
    tenantId,
    userId,
    action,
    resource,
    meta,
  };
  console.log('[AUDIT]', JSON.stringify(event));
  // TODO: Write to persistent audit log storage
}

module.exports = { logAuditEvent };
