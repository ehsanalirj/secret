// Shared Feature Flag utility for Vontres
// Usage: import { isFeatureEnabled } from './featureFlags';

const defaultFlags = {
  enableAnalytics: true,
  enableAI: false,
  enableWhiteLabel: false,
  enableMarketplace: false,
  enableSandbox: true,
};

function isFeatureEnabled(flag, tenantFlags = {}) {
  if (tenantFlags.hasOwnProperty(flag)) {
    return tenantFlags[flag];
  }
  return defaultFlags[flag] || false;
}

module.exports = { isFeatureEnabled, defaultFlags };
