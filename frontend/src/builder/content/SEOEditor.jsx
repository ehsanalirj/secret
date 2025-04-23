import React, { useState, useEffect } from 'react';

function googlePreview({ title, description, url, meta, onChange }) {
  const [aiSuggestedSEO, setAISuggestedSEO] = useState('');
  const [seo, setSEO] = useState('');

  const handleSave = () => {
    // TO DO: implement save functionality
  };

  return (
    <div className="bg-white border rounded-lg p-4 max-w-xl mb-4">
      <div className="text-xs text-gray-500 mb-1">Google Preview</div>
      <div className="text-blue-800 text-lg leading-tight truncate">{title || 'Page Title Here'} </div>
      <div className="text-green-700 text-xs mb-1">{url || 'www.example.com/page'}</div>
      <div className="flex gap-2 mb-4">
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleSave}
        >
          Save SEO
        </button>
        <button
          className="px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200"
          onClick={() => setAISuggestedSEO('website builder, drag and drop, no code, responsive, VONTRES')}
          title="AI: Suggest SEO Keywords"
        >
          🤖 Suggest SEO
        </button>
        {aiSuggestedSEO && (
          <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
            AI Suggestion: <b>{aiSuggestedSEO}</b>
            <button
              className="ml-2 underline text-blue-700"
              onClick={() => setSEO(aiSuggestedSEO)}
              title="Accept AI Suggestion"
            >Accept</button>
            <button
              className="ml-1 text-red-500 hover:text-red-700"
              onClick={() => setAISuggestedSEO('')}
              title="Dismiss"
            >×</button>
          </span>
        )}
      </div>
      <div>
        <label>
          <span className="block text-blue-900 font-medium mb-1">Description</span>
          <textarea className="border px-2 py-1 rounded w-full" value={meta?.desc || ''} onChange={e => onChange({ ...meta, desc: e.target.value })} />
        </label>
        <label>
          <span className="block text-blue-900 font-medium mb-1">OpenGraph Image URL</span>
          <input className="border px-2 py-1 rounded w-full" value={meta?.og || ''} onChange={e => onChange({ ...meta, og: e.target.value })} />
        </label>
      </div>
    </div>
  );
}
