import React, { useState } from 'react';
import { apiFetch } from '../api.js';

export default function InventoryForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', quantity: '', unit: '', category: '', supplier: '', reorderThreshold: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiFetch('/inventory', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          reorderThreshold: Number(form.reorderThreshold),
        }),
      });
      setForm({ name: '', quantity: '', unit: '', category: '', supplier: '', reorderThreshold: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-4 flex flex-wrap gap-4 items-end">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="border p-2 rounded flex-1" />
      <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" min="0" required className="border p-2 rounded w-24" />
      <input name="unit" value={form.unit} onChange={handleChange} placeholder="Unit" required className="border p-2 rounded w-24" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded w-32" />
      <input name="supplier" value={form.supplier} onChange={handleChange} placeholder="Supplier" className="border p-2 rounded w-32" />
      <input name="reorderThreshold" value={form.reorderThreshold} onChange={handleChange} placeholder="Reorder Threshold" type="number" min="0" className="border p-2 rounded w-32" />
      <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900" disabled={loading}>
        {loading ? 'Adding...' : 'Add Item'}
      </button>
      {error && <div className="text-red-600 w-full mt-2">{error}</div>}
    </form>
  );
}
