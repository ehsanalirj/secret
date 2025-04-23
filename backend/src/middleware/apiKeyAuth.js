import ApiKey from '../models/apiKey.js';

// Middleware to authenticate API requests using an API key
// Looks for key in header: x-api-key
const apiKeyAuth = async (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (!key) return res.status(401).json({ error: 'API key required' });
  const apiKey = await ApiKey.findOne({ key, status: 'active' });
  if (!apiKey) return res.status(403).json({ error: 'Invalid or revoked API key' });
  // Attach tenant and scopes to request for downstream use
  req.tenantId = apiKey.tenant;
  req.apiKeyScopes = apiKey.scopes;
  req.apiKeyId = apiKey._id;
  next();
};

export default apiKeyAuth;
