import React from 'react';

export default function PluginManager() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Plugin & Extension Manager</h2>
      <p className="text-blue-800 mb-4">Install, remove, and configure plugins/extensions for new blocks, templates, integrations, and more. (Plugin API and marketplace integration coming soon.)</p>
      <div className="bg-white rounded-xl shadow p-6">No plugins yet. Explore the marketplace!</div>
    </div>
  );
}
