import React from 'react';
import WebsiteBuilder from '../WebsiteBuilder.jsx';

export default function BusinessWebsiteBuilder() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Website Builder</h2>
      <div className="bg-white rounded shadow p-6">
        <WebsiteBuilder />
      </div>
    </div>
  );
}
