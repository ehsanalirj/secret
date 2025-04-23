import React from 'react';

export default function Menu() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Menu Management</h2>
      <div className="bg-white rounded shadow p-6">
        <p className="mb-2">Build and edit your menu here.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Classic Burger</li>
          <li>Vegan Burger</li>
          <li>Caesar Salad</li>
        </ul>
      </div>
    </div>
  );
}
