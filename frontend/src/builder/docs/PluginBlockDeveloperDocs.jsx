import React from 'react';

export default function PluginBlockDeveloperDocs() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-900 flex items-center gap-2">📚 Developer Docs: Plugins & Blocks</h2>
      <div className="mb-6 text-gray-700">
        <p className="mb-2">Welcome to the developer documentation for building custom plugins and blocks for the Website Builder platform! Here, you can learn how to:</p>
        <ul className="list-disc ml-6 mb-2">
          <li>Submit new plugins and blocks to the marketplace</li>
          <li>Understand the plugin/block API and lifecycle</li>
          <li>Test your code in the live sandbox</li>
        </ul>
        <p className="mb-2">Start by copying the code template below, then use the sandbox to test your block/plugin before submitting.</p>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">🧩 Block Example (React)</h3>
        <pre className="bg-gray-100 rounded p-3 text-xs overflow-x-auto">{`
import React from 'react';

export default function MyCustomBlock({ someProp }) {
  return <div className="p-4 border rounded">Hello from MyCustomBlock!</div>;
}
`}</pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">🔌 Plugin Example (React)</h3>
        <pre className="bg-gray-100 rounded p-3 text-xs overflow-x-auto">{`
import React from 'react';

export default function MyPlugin({ config, onConfigChange }) {
  return (
    <div>
      <h4>My Plugin Settings</h4>
      <input value={config.value} onChange={e => onConfigChange({ ...config, value: e.target.value })} />
    </div>
  );
}
`}</pre>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">📦 Submitting Your Work</h3>
        <ul className="list-disc ml-6">
          <li>Go to the Plugin Manager or Community Blocks section</li>
          <li>Click “Submit Plugin” or “Submit Block”</li>
          <li>Paste your code and fill out the required info</li>
        </ul>
      </div>
      <div className="text-xs text-gray-400">For advanced API docs and backend integrations, contact the platform team or visit our GitHub.</div>
    </div>
  );
}
