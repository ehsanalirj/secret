import React, { useState } from 'react';
import Tooltip from './Tooltip';

export default function AITitleSEOAssistant({ onSuggest, contextType = 'title', placeholder = 'Describe your page or blog...' }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  async function handleSuggest() {
    setLoading(true);
    setSuggestion('');
    // Simulate AI API call
    setTimeout(() => {
      let fake;
      if (contextType === 'title') fake = 'How to Build a Modern Website with VONTRES';
      else if (contextType === 'seo') fake = 'Learn how to create stunning, accessible websites with VONTRES. Get tips on SEO, design, and collaboration.';
      else fake = 'AI suggestion.';
      setSuggestion(fake);
      setLoading(false);
      if (onSuggest) onSuggest(fake);
    }, 1000);
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3 animate-fadeIn">
      <label className="block text-green-900 font-semibold mb-1">AI Title & SEO Assistant</label>
      <div className="flex gap-2 items-end">
        <input
          className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-green-400"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder}
          aria-label="Describe your page or blog for AI suggestion"
          disabled={loading}
        />
        <Tooltip text="Get AI suggestion">
          <button
            className="px-3 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 disabled:opacity-60"
            onClick={handleSuggest}
            disabled={loading || !input.trim()}
            aria-label="Ask AI for title/SEO suggestion"
          >
            {loading ? 'Thinking...' : 'Suggest'}
          </button>
        </Tooltip>
      </div>
      {suggestion && (
        <div className="mt-2 p-2 bg-white rounded border border-green-100 text-green-800 animate-fadeIn" aria-live="polite">
          <span className="font-semibold">AI Suggestion:</span> {suggestion}
        </div>
      )}
    </div>
  );
}
