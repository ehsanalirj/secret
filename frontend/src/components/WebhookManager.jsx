import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

export default function WebhookManager() {
  const { user } = useUser();
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWebhooks() {
      setLoading(true);
      try {
        const res = await fetch('/api/webhook', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch webhooks');
        const data = await res.json();
        setWebhooks(data);
      } catch (e) {
        setWebhooks([]);
      }
      setLoading(false);
    }
    if (user) fetchWebhooks();
  }, [user]);

  if (!user) return null;
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-2">Webhook Manager</h2>
      {loading ? <div>Loading...</div> : webhooks.length === 0 ? <div>No webhooks found.</div> : (
        <ul>
          {webhooks.map(w => (
            <li key={w._id} className="border-b py-2 last:border-b-0">
              <div className="font-semibold">{w.event}</div>
              <div className="text-xs text-gray-500">{w.url}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
