import React, { useState } from 'react';
import Tooltip from './Tooltip';

export default function AIContentAssistant({ onSuggest, contextType = 'block', placeholder = 'Describe what you want...' }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  async function handleSuggest() {
    setLoading(true);
    setSuggestion('');
    // Simulate AI API call
    setTimeout(() => {
      const fake = contextType === 'block'
        ? 'Testimonial slider: "Our customers love us!" - Jane Doe'
        : 'Suggested title: "Grow Your Business with VONTRES"';
      setSuggestion(fake);
      setLoading(false);
      if (onSuggest) onSuggest(fake);
    }, 1200);
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3 animate-fadeIn">
      <label className="block text-blue-900 font-semibold mb-1">AI Assistant</label>
      <div className="flex gap-2 items-end">
        <input
          className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder}
          aria-label="Describe your content or block"
          disabled={loading}
        />
        <Tooltip text="Get AI suggestion">
          <button
            className="px-3 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-60"
            onClick={handleSuggest}
            disabled={loading || !input.trim()}
            aria-label="Ask AI for suggestion"
          >
            {loading ? 'Thinking...' : 'Suggest'}
          </button>
        </Tooltip>
      </div>
      {suggestion && (
        <div className="mt-2 p-2 bg-white rounded border border-blue-100 text-blue-800 animate-fadeIn" aria-live="polite">
          <span className="font-semibold">AI Suggestion:</span> {suggestion}
        </div>
      )}
    </div>
  );
}
