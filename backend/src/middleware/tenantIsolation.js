// Middleware to enforce tenant data isolation for multi-tenant models
// Usage: app.use('/api/feature-flag', enforceTenantIsolation('tenant'))

export function enforceTenantIsolation(field = 'tenant') {
  return (req, res, next) => {
    // If user is super admin, allow all
    if (req.user && req.user.role === 'admin' && !req.user.tenant) return next();
    // Determine tenant from user or request (JWT or query/body)
    const tenantId = req.user?.tenant || req.query.tenant || req.body.tenant;
    if (!tenantId) {
      return res.status(400).json({ error: 'Tenant context required' });
    }
    // Attach tenantId to request for downstream use
    req.tenantId = tenantId;
    // Check if tenant is sandboxed (requires Tenant model)
    import('../models/tenant.js').then(({ default: Tenant }) => {
      Tenant.findById(tenantId).then(tenantDoc => {
        req.isSandbox = !!tenantDoc?.sandbox;
        // For GET, inject filter
        if (req.method === 'GET') {
          req.query[field] = tenantId;
        }
        // For POST/PUT, inject into body
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
          req.body[field] = tenantId;
        }
        next();
      }).catch(() => next());
    });
  };
}

export default enforceTenantIsolation;
