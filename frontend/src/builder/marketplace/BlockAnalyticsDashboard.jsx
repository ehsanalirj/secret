import React from 'react';

export default function BlockAnalyticsDashboard({ blocks }) {
  // Demo: aggregate stats
  const totalInstalls = blocks.reduce((sum, b) => sum + b.installs, 0);
  const avgRating = blocks.length ? (blocks.reduce((sum, b) => sum + b.rating, 0) / blocks.length).toFixed(2) : 0;
  const trending = blocks.filter(b => b.installs >= 30 && b.installs < 50);
  const mostUsed = blocks.filter(b => b.installs >= 50);
  const topRated = blocks.filter(b => b.rating >= 5 && b.installs >= 20);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">📊 Block Analytics Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded p-4 text-center">
          <div className="text-3xl font-bold">{totalInstalls}</div>
          <div className="text-xs text-blue-900">Total Installs</div>
        </div>
        <div className="bg-yellow-50 rounded p-4 text-center">
          <div className="text-3xl font-bold">{avgRating}</div>
          <div className="text-xs text-yellow-900">Avg. Rating</div>
        </div>
        <div className="bg-pink-50 rounded p-4 text-center">
          <div className="text-3xl font-bold">{trending.length}</div>
          <div className="text-xs text-pink-900">Trending Blocks</div>
        </div>
        <div className="bg-purple-50 rounded p-4 text-center">
          <div className="text-3xl font-bold">{mostUsed.length}</div>
          <div className="text-xs text-purple-900">Most Used</div>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Top Rated</h3>
        <ul className="list-disc ml-6 text-blue-900">
          {topRated.length === 0 && <li className="text-gray-500">No top rated blocks yet.</li>}
          {topRated.map(b => <li key={b.id}>{b.name} (⭐ {b.rating}, ⬇️ {b.installs})</li>)}
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-2">Trending This Week</h3>
        <ul className="list-disc ml-6 text-blue-900">
          {trending.length === 0 && <li className="text-gray-500">No trending blocks this week.</li>}
          {trending.map(b => <li key={b.id}>{b.name} (⬇️ {b.installs})</li>)}
        </ul>
      </div>
    </div>
  );
}
