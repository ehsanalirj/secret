import React from 'react';

export default function Departments() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Departments</h2>
      <div className="bg-white rounded shadow p-6">
        <p className="mb-2">Manage all your departments here.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Kitchen</li>
          <li>Front of House</li>
          <li>Delivery</li>
          <li>HR</li>
          <li>Marketing</li>
        </ul>
      </div>
    </div>
  );
}
