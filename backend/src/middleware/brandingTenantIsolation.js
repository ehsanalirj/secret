// Middleware to ensure only the correct tenant or admin can update/fetch branding
export default function enforceBrandingTenantIsolation() {
  return (req, res, next) => {
    // Admins can always proceed
    if (req.user && req.user.role === 'admin') return next();
    // For POST/PUT, tenant in body must match user's tenant
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      if (req.body.tenant && req.user.tenant && req.body.tenant === req.user.tenant) return next();
      return res.status(403).json({ error: 'Forbidden: Tenant mismatch' });
    }
    // For GET, tenant in params or query must match user's tenant
    const tenantId = req.params.tenant || req.query.tenant;
    if (tenantId && req.user.tenant && tenantId === req.user.tenant) return next();
    return res.status(403).json({ error: 'Forbidden: Tenant mismatch' });
  };
}
