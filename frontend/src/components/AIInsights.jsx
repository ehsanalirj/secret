import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';

export default function AIInsights() {
  const { user } = useUser();
  const [recommendations, setRecommendations] = useState(null);
  const [type, setType] = useState('menu');
  const [loading, setLoading] = useState(false);

  async function fetchAI() {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ type }),
      });
      if (!res.ok) throw new Error('Failed to fetch AI recommendations');
      const data = await res.json();
      setRecommendations(data.recommendations);
    } catch (e) {
      setRecommendations([]);
    }
    setLoading(false);
  }

  if (!user) return null;
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-2">AI Insights & Recommendations</h2>
      <div className="mb-2">
        <select value={type} onChange={e => setType(e.target.value)} className="border rounded p-1">
          <option value="menu">Menu</option>
          <option value="pricing">Pricing</option>
          <option value="inventory">Inventory</option>
        </select>
        <button onClick={fetchAI} className="ml-2 px-3 py-1 bg-blue-600 text-white rounded">Get Recommendations</button>
      </div>
      {loading ? <div>Loading...</div> : recommendations && (
        <ul className="list-disc ml-6">
          {recommendations.map((rec, i) => (
            <li key={i}>{typeof rec === 'string' ? rec : JSON.stringify(rec)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
