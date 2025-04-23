import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    const userRoles = Array.isArray(req.user.roles) ? req.user.roles : (req.user.role ? [req.user.role] : []);
    const hasRole = userRoles.some(r => roles.includes(r));
    if (!hasRole) {
      // Debug logging for authorization failures
      console.error('[RBAC] Authorization failed:', {
        userRoles,
        allowedRoles: roles,
        user: req.user
      });
      return res.status(403).json({ error: 'Forbidden: Insufficient role', debug: { userRoles, allowedRoles: roles, user: req.user } });
    }
    next();
  };
}
