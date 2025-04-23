// Analytics API utility for frontend
export async function fetchAnalytics(token, { start, end, type } = {}) {
  const params = new URLSearchParams();
  if (start) params.append('start', start);
  if (end) params.append('end', end);
  if (type) params.append('type', type);
  const res = await fetch(`/api/analytics?${params.toString()}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}
