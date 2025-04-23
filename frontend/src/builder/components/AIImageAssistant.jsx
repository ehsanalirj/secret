import React, { useState } from 'react';
import Tooltip from './Tooltip';

export default function AIImageAssistant({ onSuggest, placeholder = 'Describe the image you want...' }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  async function handleSuggest() {
    setLoading(true);
    setImageUrl('');
    // Simulate AI/Unsplash API call
    setTimeout(() => {
      // Placeholder image and alt
      const url = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80';
      setImageUrl(url);
      setLoading(false);
      if (onSuggest) onSuggest(url);
    }, 1200);
  }

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-3 animate-fadeIn">
      <label className="block text-purple-900 font-semibold mb-1">AI Image Assistant</label>
      <div className="flex gap-2 items-end">
        <input
          className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-purple-400"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder}
          aria-label="Describe the image you want"
          disabled={loading}
        />
        <Tooltip text="Suggest image with AI/Unsplash">
          <button
            className="px-3 py-2 rounded bg-purple-600 text-white font-bold hover:bg-purple-700 disabled:opacity-60"
            onClick={handleSuggest}
            disabled={loading || !input.trim()}
            aria-label="Ask AI for image suggestion"
          >
            {loading ? 'Finding...' : 'Suggest'}
          </button>
        </Tooltip>
      </div>
      {imageUrl && (
        <div className="mt-2 flex flex-col items-start animate-fadeIn">
          <img src={imageUrl} alt="AI/Unsplash suggestion" className="w-40 h-28 object-cover rounded shadow mb-1" />
          <span className="text-xs text-gray-600">Image via Unsplash/AI</span>
        </div>
      )}
    </div>
  );
}
