// Orders API utility for frontend
export async function fetchOrders(token) {
  const res = await fetch('/api/order', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}
