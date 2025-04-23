import React from 'react';

export default function Inventory() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      <div className="bg-white rounded shadow p-6">
        <p className="mb-2">Track and manage inventory here.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Tomatoes - 50 units</li>
          <li>Buns - 100 units</li>
        </ul>
      </div>
    </div>
  );
}
