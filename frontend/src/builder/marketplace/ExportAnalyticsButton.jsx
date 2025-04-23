import React from 'react';

export default function ExportAnalyticsButton({ blocks }) {
  function handleExport() {
    const rows = [
      ['Block Name', 'Installs', 'Avg Rating', 'Reviews'],
      ...blocks.map(b => [b.name, b.installs, b.rating, b.id === 5 ? 2 : 0])
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'block-analytics.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <button onClick={handleExport} className="mb-4 px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-800">
      Export Analytics CSV
    </button>
  );
}
