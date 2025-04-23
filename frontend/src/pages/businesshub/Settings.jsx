import React from 'react';

export default function Settings() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="bg-white rounded shadow p-6">
        <p className="mb-2">Business settings and integrations coming soon.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Branding</li>
          <li>API Keys</li>
          <li>Integrations</li>
        </ul>
      </div>
    </div>
  );
}
