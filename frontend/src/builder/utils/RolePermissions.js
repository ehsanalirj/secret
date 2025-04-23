// Utility for role-based permissions
// Placeholder for permissions logic: writer, designer, developer, admin, reviewer

export const ROLES = ['writer', 'designer', 'developer', 'admin', 'reviewer'];

export function canEdit(role, resource) {
  // TODO: Implement permission logic based on role and resource type
  return true;
}

export function canPublish(role) {
  // TODO: Implement publish permissions
  return role === 'admin' || role === 'reviewer';
}

export function canComment(role) {
  // TODO: Implement comment permissions
  return true;
}
