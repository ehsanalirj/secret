// Notification API utility for frontend
export async function fetchNotifications(token) {
  const res = await fetch('/api/notification', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}
