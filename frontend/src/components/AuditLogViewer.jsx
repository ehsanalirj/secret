import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

export default function AuditLogViewer() {
  const { user } = useUser();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      try {
        const url = filter ? `/api/auditLog?user=${filter}` : '/api/auditLog';
        const res = await fetch(url, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch audit logs');
        const data = await res.json();
        setLogs(data);
      } catch (e) {
        setLogs([]);
      }
      setLoading(false);
    }
    if (user) fetchLogs();
  }, [user, filter]);

  if (!user) return null;
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-2">Audit Log Viewer</h2>
      <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter by userId..." className="border rounded p-1 mb-2" />
      {loading ? <div>Loading...</div> : logs.length === 0 ? <div>No audit logs found.</div> : (
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th>User</th><th>Action</th><th>Details</th><th>Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l._id}>
                <td>{l.user}</td>
                <td>{l.action}</td>
                <td>{JSON.stringify(l.details)}</td>
                <td>{new Date(l.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
