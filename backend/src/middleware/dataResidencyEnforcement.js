// Middleware to enforce data residency policy for tenant-scoped APIs
// Usage: router.use(enforceDataResidency(['EU', 'US']))
import Tenant from '../models/tenant.js';

export function enforceDataResidency(allowedRegions = []) {
  return async (req, res, next) => {
    const tenantId = req.tenantId || req.user?.tenant || req.body.tenant || req.query.tenant;
    if (!tenantId) return res.status(400).json({ error: 'Tenant context required for data residency enforcement' });
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' });
    if (allowedRegions.length && !allowedRegions.includes(tenant.dataResidency)) {
      return res.status(403).json({ error: `Data residency policy violation: tenant data must remain in [${allowedRegions.join(', ')}]` });
    }
    req.tenantResidency = tenant.dataResidency;
    next();
  };
}

export default enforceDataResidency;
