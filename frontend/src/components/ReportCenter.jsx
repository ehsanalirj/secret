import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';

export default function ReportCenter() {
  const { user } = useUser();
  const [data, setData] = useState('');
  const [format, setFormat] = useState('csv');
  const [downloading, setDownloading] = useState(false);

  async function exportReport() {
    setDownloading(true);
    try {
      const res = await fetch(`/api/report/export/${format}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ data: JSON.parse(data) }),
      });
      if (!res.ok) throw new Error('Failed to export report');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {}
    setDownloading(false);
  }

  if (!user) return null;
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-2">Report Center</h2>
      <textarea value={data} onChange={e => setData(e.target.value)} className="w-full border rounded p-2 mb-2" rows={4} placeholder="Paste JSON array here for export..." />
      <div className="mb-2">
        <select value={format} onChange={e => setFormat(e.target.value)} className="border rounded p-1">
          <option value="csv">CSV</option>
          <option value="pdf">PDF</option>
        </select>
        <button onClick={exportReport} className="ml-2 px-3 py-1 bg-green-600 text-white rounded" disabled={downloading}>{downloading ? 'Exporting...' : 'Export'}</button>
      </div>
    </div>
  );
}
