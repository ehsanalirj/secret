import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

export default function DSRConsentManager() {
  const { user } = useUser();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      try {
        // Replace with real API call
        const res = await fetch('/api/dsr', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch DSRs');
        const data = await res.json();
        setRequests(data);
      } catch (e) {
        setRequests([]);
      }
      setLoading(false);
    }
    if (user) fetchRequests();
  }, [user]);

  if (!user) return null;
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Data Subject Requests & Consent Management</h2>
      {loading ? <div>Loading...</div> : requests.length === 0 ? <div>No DSRs found.</div> : (
        <ul>
          {requests.map(r => (
            <li key={r._id} className="border-b py-2 last:border-b-0">
              <div className="font-semibold">{r.type} - {r.status}</div>
              <div className="text-xs text-gray-500">Requested by: {r.userEmail}</div>
              <div className="text-xs">{new Date(r.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
