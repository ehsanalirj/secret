import React from 'react';

export default function Employees() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      <div className="bg-white rounded shadow p-6">
        <p className="mb-2">Employee directory and management coming soon.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Jane Smith - Manager</li>
          <li>John Doe - Chef</li>
          <li>Emily Lin - Waitstaff</li>
        </ul>
      </div>
    </div>
  );
}
