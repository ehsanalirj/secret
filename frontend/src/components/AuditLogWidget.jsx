import React from 'react';
import useAuditLogs from '../hooks/useAuditLogs';

export default function AuditLogWidget() {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
  const { logs, loading, error } = useAuditLogs(token);

  return (
    <div className="bg-white rounded shadow p-4 max-w-md w-full">
      <h4 className="font-bold mb-2">Recent Audit Logs</h4>
      {loading && <div className="text-xs text-blue-400">Loading...</div>}
      {error && <div className="text-xs text-red-500">{error}</div>}
      <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
        {(logs || []).slice(0, 10).map(log => (
          <li key={log._id} className="py-2 text-xs flex flex-col">
            <span className="font-semibold text-gray-700">{log.action}</span>
            <span className="text-gray-500">{log.details ? JSON.stringify(log.details) : ''}</span>
            <span className="text-gray-400">{log.createdAt ? new Date(log.createdAt).toLocaleString() : ''}</span>
            <span className="text-gray-400">User: {log.user || '-'}</span>
          </li>
        ))}
        {!loading && (!logs || logs.length === 0) && (
          <li className="py-2 text-xs text-gray-400">No audit logs found.</li>
        )}
      </ul>
    </div>
  );
}
