import React from 'react';

export default function AnalyticsDashboardBlock({ trackingId }) {
  // Demo stats; real integration would fetch from Google Analytics API
  const stats = [
    { label: 'Visitors', value: 1243 },
    { label: 'Page Views', value: 3679 },
    { label: 'Bounce Rate', value: '38%' },
    { label: 'Avg. Session', value: '2m 13s' },
  ];

  return (
    <div className="border rounded-xl p-6 bg-white shadow w-full max-w-md mx-auto">
      <div className="text-2xl font-bold text-blue-900 mb-2">Analytics Dashboard</div>
      <div className="mb-2 text-gray-700 text-xs">Tracking ID: {trackingId || 'UA-XXXXXXX-X'} (Demo)</div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
            <div className="text-xl font-bold text-blue-800">{s.value}</div>
            <div className="text-xs text-blue-700">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-400">(Demo only, not real data)</div>
    </div>
  );
}
