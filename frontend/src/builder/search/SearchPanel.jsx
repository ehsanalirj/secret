import React from 'react';

export default function SearchPanel() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Site Search Engine</h2>
      <p className="text-blue-800 mb-4">Built-in search engine with typo tolerance, filters, and instant results. (Advanced search, dynamic filters, and indexing coming soon.)</p>
      <div className="bg-white rounded-xl shadow p-6">No search results yet. Try searching your content!</div>
    </div>
  );
}
