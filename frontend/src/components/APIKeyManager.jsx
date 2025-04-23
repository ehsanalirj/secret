import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

export default function APIKeyManager() {
  const { user } = useUser();
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKeys() {
      setLoading(true);
      try {
        const res = await fetch('/api/apiKey', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch API keys');
        const data = await res.json();
        setKeys(data);
      } catch (e) {
        setKeys([]);
      }
      setLoading(false);
    }
    if (user) fetchKeys();
  }, [user]);

  if (!user) return null;
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded shadow p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">API Key Manager</h2>
      {loading ? <div>Loading...</div> : keys.length === 0 ? <div>No API keys found.</div> : (
        <ul>
          {keys.map(k => (
            <li key={k._id} className="border-b py-2 last:border-b-0">
              <div className="font-semibold">{k.label}</div>
              <div className="text-xs text-gray-500">{k.key}</div>
              <div className="text-xs">Scopes: {k.scopes?.join(', ')}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
