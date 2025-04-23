import React, { useState } from 'react';

export default function BlockPluginSandbox() {
  const [code, setCode] = useState(`import React from 'react';\n\nexport default function MyBlock() {\n  return <div className=\"p-4 border rounded\">Hello from the sandbox!</div>;\n}`);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState('');

  function handleRun() {
    setError('');
    setOutput(null);
    try {
      // eslint-disable-next-line no-new-func
      const Component = new Function('React', `${code}\n;return MyBlock;`)(React);
      setOutput(<Component />);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-900 flex items-center gap-2">🧪 Block/Plugin Sandbox</h2>
      <div className="mb-4 text-gray-700">Paste your React block/plugin code below and click Run to see a live preview.</div>
      <textarea
        className="w-full h-40 border rounded p-2 font-mono text-xs mb-3"
        value={code}
        onChange={e => setCode(e.target.value)}
        spellCheck={false}
      />
      <button className="px-4 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-900" onClick={handleRun}>Run</button>
      {error && <div className="text-red-600 mt-3">Error: {error}</div>}
      <div className="mt-6">
        <h4 className="font-bold mb-2">Preview:</h4>
        <div className="border rounded p-4 bg-gray-50 min-h-[40px]">{output}</div>
      </div>
      <div className="text-xs text-gray-400 mt-4">Note: Only simple React blocks/plugins are supported in this sandbox. For advanced integrations, test in your local dev environment.</div>
    </div>
  );
}
