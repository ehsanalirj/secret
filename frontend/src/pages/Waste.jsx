import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';
import WasteForm from './WasteForm.jsx';

export default function Waste() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  function fetchLogs() {
    setLoading(true);
    apiFetch('/waste')
      .then(setLogs)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Food Waste Management</h2>
      <WasteForm onSuccess={fetchLogs} />
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <table className="w-full mt-4 bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2 text-left">Item</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Unit</th>
            <th className="p-2">Reason</th>
            <th className="p-2">Destination</th>
            <th className="p-2">Date</th>
            <th className="p-2">Handled By</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id} className="border-b hover:bg-blue-50">
              <td className="p-2">{log.inventoryItem?.name || '-'}</td>
              <td className="p-2 text-center">{log.quantity}</td>
              <td className="p-2 text-center">{log.inventoryItem?.unit || '-'}</td>
              <td className="p-2">{log.reason}</td>
              <td className="p-2">{log.destination}</td>
              <td className="p-2 text-xs">{new Date(log.date).toLocaleDateString()}</td>
              <td className="p-2">{log.handledBy?.name || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
