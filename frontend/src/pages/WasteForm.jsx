import React, { useState, useEffect } from 'react';
import { apiFetch } from '../api.js';

export default function WasteForm({ onSuccess }) {
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({ inventoryItem: '', quantity: '', reason: 'expired', destination: 'trash', notes: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch('/inventory')
      .then(setInventory)
      .catch(() => setInventory([]));
  }, []);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiFetch('/waste', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
        }),
      });
      setForm({ inventoryItem: '', quantity: '', reason: 'expired', destination: 'trash', notes: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-4 flex flex-wrap gap-4 items-end">
      <select name="inventoryItem" value={form.inventoryItem} onChange={handleChange} required className="border p-2 rounded flex-1">
        <option value="">Select Item</option>
        {inventory.map(item => (
          <option key={item._id} value={item._id}>{item.name}</option>
        ))}
      </select>
      <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" min="1" required className="border p-2 rounded w-24" />
      <select name="reason" value={form.reason} onChange={handleChange} className="border p-2 rounded w-32">
        <option value="expired">Expired</option>
        <option value="spoiled">Spoiled</option>
        <option value="overcooked">Overcooked</option>
        <option value="other">Other</option>
      </select>
      <select name="destination" value={form.destination} onChange={handleChange} className="border p-2 rounded w-32">
        <option value="trash">Trash</option>
        <option value="donation">Donation</option>
        <option value="compost">Compost</option>
        <option value="other">Other</option>
      </select>
      <input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="border p-2 rounded flex-1" />
      <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900" disabled={loading}>
        {loading ? 'Logging...' : 'Log Waste'}
      </button>
      {error && <div className="text-red-600 w-full mt-2">{error}</div>}
    </form>
  );
}
