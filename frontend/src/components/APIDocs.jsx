import React from 'react';

export default function APIDocs() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">API Documentation & Playground</h2>
      <iframe
        src="/api-docs"
        title="API Docs"
        className="w-full h-[600px] border rounded"
        style={{ minHeight: 600 }}
      />
      <div className="mt-2 text-xs text-gray-500">Interactive API documentation powered by OpenAPI/Swagger.</div>
    </div>
  );
}
