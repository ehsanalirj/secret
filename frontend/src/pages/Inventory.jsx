import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';
import InventoryForm from './InventoryForm.jsx';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  function fetchItems() {
    setLoading(true);
    apiFetch('/inventory')
      .then(setItems)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
      <InventoryForm onSuccess={fetchItems} />
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <table className="w-full mt-4 bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Unit</th>
            <th className="p-2">Category</th>
            <th className="p-2">Supplier</th>
            <th className="p-2">Reorder Threshold</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id} className="border-b hover:bg-blue-50">
              <td className="p-2">{item.name}</td>
              <td className="p-2 text-center">{item.quantity}</td>
              <td className="p-2 text-center">{item.unit}</td>
              <td className="p-2">{item.category || '-'}</td>
              <td className="p-2">{item.supplier || '-'}</td>
              <td className="p-2 text-center">{item.reorderThreshold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
