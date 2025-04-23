import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

export default function NotificationCenter() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      try {
        const res = await fetch('/api/notification', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch notifications');
        const data = await res.json();
        setNotifications(data);
      } catch (e) {
        setNotifications([]);
      }
      setLoading(false);
    }
    if (user) fetchNotifications();
  }, [user]);

  if (!user) return null;
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-2">Notifications</h2>
      {loading ? <div>Loading...</div> : notifications.length === 0 ? <div>No notifications.</div> : (
        <ul>
          {notifications.map(n => (
            <li key={n._id} className="border-b py-2 last:border-b-0">
              <div className="font-semibold">{n.title || n.message}</div>
              <div className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
