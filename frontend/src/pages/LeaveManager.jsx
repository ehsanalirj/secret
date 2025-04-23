import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

export default function LeaveManager() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/leave')
      .then(setLeaves)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAction(employeeId, leaveIdx, status) {
    await apiFetch(`/leave/${employeeId}/${leaveIdx}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    setLeaves(leaves => leaves.map(l => (l.employee._id === employeeId && l._id === leaveIdx ? { ...l, status } : l)));
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Leave Requests</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2">Employee</th>
            <th className="p-2">Type</th>
            <th className="p-2">From</th>
            <th className="p-2">To</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((l, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{l.employee?.name || '-'}</td>
              <td className="p-2">{l.type}</td>
              <td className="p-2">{new Date(l.from).toLocaleDateString()}</td>
              <td className="p-2">{new Date(l.to).toLocaleDateString()}</td>
              <td className="p-2">{l.status}</td>
              <td className="p-2">
                {l.status === 'pending' && (
                  <>
                    <button onClick={() => handleAction(l.employee._id, i, 'approved')} className="bg-green-600 text-white px-2 py-1 rounded mr-2">Approve</button>
                    <button onClick={() => handleAction(l.employee._id, i, 'rejected')} className="bg-red-600 text-white px-2 py-1 rounded">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
