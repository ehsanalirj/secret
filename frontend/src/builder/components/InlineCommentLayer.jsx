import React, { useState } from 'react';
import Tooltip from './Tooltip';

// Demo comments
const DEMO_COMMENTS = [
  { id: 1, blockId: 'hero', x: 180, y: 60, user: 'Alice', text: 'Can we make the headline bigger?', resolved: false },
  { id: 2, blockId: 'feature', x: 420, y: 200, user: 'Bob', text: 'Add another feature here?', resolved: false },
];

export default function InlineCommentLayer({ comments = DEMO_COMMENTS, onAdd, onResolve }) {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState('');
  const [inputPos, setInputPos] = useState({ x: 0, y: 0 });

  // For demo: click to add comment at position
  function handleCanvasClick(e) {
    if (!showInput) {
      setInput('');
      setInputPos({ x: e.clientX, y: e.clientY });
      setShowInput(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim()) {
      if (onAdd) onAdd({ text: input, x: inputPos.x, y: inputPos.y, user: 'You', resolved: false });
      setShowInput(false);
      setInput('');
    }
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" aria-live="polite" onClick={handleCanvasClick}>
      {comments.filter(c => !c.resolved).map(c => (
        <Tooltip text={c.text} key={c.id} position="right">
          <div
            className="absolute flex items-center gap-1 pointer-events-auto cursor-pointer group"
            style={{ left: c.x, top: c.y }}
            tabIndex={0}
            aria-label={`Comment by ${c.user}: ${c.text}`}
          >
            <span className="w-5 h-5 rounded-full bg-yellow-300 text-yellow-900 font-bold flex items-center justify-center border-2 border-white shadow">
              💬
            </span>
            <span className="hidden group-hover:inline bg-white border rounded px-2 py-1 text-xs text-gray-800">
              {c.user}: {c.text}
              <button
                className="ml-2 text-blue-600 underline text-xs"
                onClick={e => { e.stopPropagation(); if (onResolve) onResolve(c.id); }}
                aria-label="Resolve comment"
              >Resolve</button>
            </span>
          </div>
        </Tooltip>
      ))}
      {showInput && (
        <form
          className="absolute bg-white border rounded p-2 shadow flex gap-2 items-center"
          style={{ left: inputPos.x, top: inputPos.y }}
          onSubmit={handleSubmit}
        >
          <input
            className="px-2 py-1 border rounded text-xs"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a comment..."
            autoFocus
            aria-label="Add a comment"
          />
          <button type="submit" className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-bold">Add</button>
          <button type="button" className="px-2 py-1 bg-gray-200 rounded text-xs" onClick={() => setShowInput(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
}
