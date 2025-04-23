import React from 'react';

export default function AirtableTableBlock({ apiKey, baseId, tableName }) {
  // Demo data; real integration would fetch from Airtable API
  const rows = [
    { Name: 'Alice', Email: 'alice@example.com', Status: 'Active' },
    { Name: 'Bob', Email: 'bob@example.com', Status: 'Pending' },
    { Name: 'Carol', Email: 'carol@example.com', Status: 'Active' },
  ];

  return (
    <div className="border rounded-xl p-6 bg-white shadow w-full max-w-xl mx-auto">
      <div className="text-2xl font-bold text-blue-900 mb-2">Airtable Table</div>
      <div className="mb-2 text-gray-700 text-xs">Base: {baseId || 'DemoBase'} | Table: {tableName || 'Contacts'} (Demo)</div>
      <table className="w-full mt-2 border">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-2 py-1 border">Name</th>
            <th className="px-2 py-1 border">Email</th>
            <th className="px-2 py-1 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="px-2 py-1 border">{row.Name}</td>
              <td className="px-2 py-1 border">{row.Email}</td>
              <td className="px-2 py-1 border">{row.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-xs text-gray-400">(Demo only, not real data)</div>
    </div>
  );
}
