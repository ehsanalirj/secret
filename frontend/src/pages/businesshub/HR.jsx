import React from 'react';

export default function HR() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">HR & Payroll</h2>
      <div className="bg-white rounded shadow p-6">
        <p className="mb-2">Manage HR, payroll, and time-off here.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Jane Smith requested time off</li>
          <li>Payroll processed for March</li>
        </ul>
      </div>
    </div>
  );
}
