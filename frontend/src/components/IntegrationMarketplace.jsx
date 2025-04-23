import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

export default function IntegrationMarketplace() {
  const { user } = useUser();
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIntegrations() {
      setLoading(true);
      try {
        const res = await fetch('/api/integration', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch integrations');
        const data = await res.json();
        setIntegrations(data);
      } catch (e) {
        setIntegrations([]);
      }
      setLoading(false);
    }
    if (user) fetchIntegrations();
  }, [user]);

  if (!user) return null;
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-2">Integration Marketplace</h2>
      {loading ? <div>Loading...</div> : integrations.length === 0 ? <div>No integrations found.</div> : (
        <ul>
          {integrations.map(i => (
            <li key={i._id} className="border-b py-2 last:border-b-0">
              <div className="font-semibold">{i.name}</div>
              <div className="text-xs text-gray-500">{i.type}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
