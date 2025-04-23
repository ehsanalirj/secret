// Shared RBAC utility for Vontres
// Usage: import { checkPermission, getRolePermissions } from './rbac';

const roles = {
  superadmin: ['*'],
  admin: ['read', 'write', 'delete', 'manage-users', 'manage-restaurant', 'manage-billing', 'manage-analytics'],
  manager: ['read', 'write', 'manage-orders', 'manage-menu', 'manage-staff'],
  staff: ['read', 'manage-orders'],
  guest: ['read'],
};

function checkPermission(role, permission) {
  if (!roles[role]) return false;
  if (roles[role].includes('*')) return true;
  return roles[role].includes(permission);
}

function getRolePermissions(role) {
  return roles[role] || [];
}

module.exports = { checkPermission, getRolePermissions, roles };
