import FeatureFlag from '../models/featureFlag.js';

// Middleware to enforce feature flags for routes
// Usage: featureFlagEnforcement('loyalty_program')
const featureFlagEnforcement = (key) => async (req, res, next) => {
  // Check for tenant-specific flag, then global
  let flag;
  if (req.user && req.user.tenant) {
    flag = await FeatureFlag.findOne({ key, tenant: req.user.tenant });
  }
  if (!flag) {
    flag = await FeatureFlag.findOne({ key, tenant: null });
  }
  if (flag && !flag.enabled) {
    return res.status(403).json({ error: `Feature '${key}' is disabled.` });
  }
  next();
};

export default featureFlagEnforcement;
