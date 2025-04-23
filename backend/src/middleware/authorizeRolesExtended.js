// Extended RBAC middleware: checks role, department, and device if required
export function authorizeRolesExtended({ roles = [], departments = [], devices = [] } = {}) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    // Role check
    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient role' });
    }
    // Department check (if specified)
    if (departments.length && (!user.department || !departments.includes(user.department))) {
      return res.status(403).json({ error: 'Forbidden: Department mismatch' });
    }
    // Device check (if specified)
    if (devices.length && (!user.device || !devices.includes(user.device))) {
      return res.status(403).json({ error: 'Forbidden: Device not allowed' });
    }
    next();
  };
}

export default authorizeRolesExtended;
