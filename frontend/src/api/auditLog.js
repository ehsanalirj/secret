// Audit Log API utility for frontend
export async function fetchAuditLogs(token, { tenant, user, action } = {}) {
  const params = new URLSearchParams();
  if (tenant) params.append('tenant', tenant);
  if (user) params.append('user', user);
  if (action) params.append('action', action);
  const res = await fetch(`/api/audit-log?${params.toString()}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch audit logs');
  return res.json();
}
