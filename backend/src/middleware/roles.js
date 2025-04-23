// Role-based access middleware
export function requireRole(role) {
  return function (req, res, next) {
    const user = req.user;
    if (!user || user.role !== role) {
      return res.status(403).json({ error: 'Forbidden: insufficient role' });
    }
    next();
  };
}


