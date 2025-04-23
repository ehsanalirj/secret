import React from 'react';
import useNotifications from '../hooks/useNotifications';

export default function NotificationCenterWidget() {
  // Assume JWT token is stored in localStorage as 'accessToken'
  const token = localStorage.getItem('accessToken');
  const { notifications, loading, error } = useNotifications(token);

  return (
    <div className="bg-white rounded shadow p-4 max-w-xs w-full">
      <h4 className="font-bold mb-2">Notifications</h4>
      {loading && <div className="text-xs text-blue-400">Loading...</div>}
      {error && <div className="text-xs text-red-500">{error}</div>}
      <ul className="divide-y divide-gray-200">
        {(notifications || []).map(n => (
          <li key={n._id || n.id} className="py-2 text-sm flex flex-col">
            <span className="font-semibold text-blue-700">{n.message || n.subject || n.template}</span>
            <span className="text-xs text-gray-400">{n.createdAt ? new Date(n.createdAt).toLocaleString() : ''}</span>
          </li>
        ))}
        {!loading && (!notifications || notifications.length === 0) && (
          <li className="py-2 text-xs text-gray-400">No notifications found.</li>
        )}
      </ul>
    </div>
  );
}
