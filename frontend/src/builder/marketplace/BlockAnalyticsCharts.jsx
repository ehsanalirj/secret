import React from 'react';
// If you add Chart.js or Recharts, import them here. For demo, use SVGs.

export default function BlockAnalyticsCharts({ blocks }) {
  // Demo: show installs and ratings as bar charts for each block
  const maxInstalls = Math.max(...blocks.map(b => b.installs), 1);
  const maxRating = Math.max(...blocks.map(b => b.rating), 1);

  return (
    <div className="my-8">
      <h3 className="font-bold mb-2 text-blue-900">📈 Installs & Ratings (Demo Charts)</h3>
      <div className="flex flex-col gap-4">
        {blocks.map(b => (
          <div key={b.id} className="flex items-center gap-4">
            <span className="w-36 text-xs font-bold text-blue-900">{b.name}</span>
            <div className="flex-1 flex gap-2 items-center">
              <div className="bg-blue-500 h-4 rounded" style={{ width: `${(b.installs / maxInstalls) * 200}px` }} title={`Installs: ${b.installs}`}></div>
              <span className="text-xs text-blue-700">⬇️ {b.installs}</span>
              <div className="bg-yellow-400 h-4 rounded" style={{ width: `${(b.rating / maxRating) * 100}px` }} title={`Avg Rating: ${b.rating}`}></div>
              <span className="text-xs text-yellow-700">⭐ {b.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
