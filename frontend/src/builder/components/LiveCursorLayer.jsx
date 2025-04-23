import React, { useEffect, useRef } from 'react';

// Demo/mock users for real-time cursors
const DEMO_CURSORS = [
  { id: 1, name: 'Alice', color: 'bg-pink-400', x: 120, y: 80 },
  { id: 2, name: 'Bob', color: 'bg-green-400', x: 400, y: 220 },
  { id: 3, name: 'You', color: 'bg-blue-600', x: 250, y: 160 },
];

export default function LiveCursorLayer({ cursors = DEMO_CURSORS }) {
  const layerRef = useRef();

  // Accessibility: announce cursor moves
  useEffect(() => {
    // Could use ARIA live region for screen readers
  }, [cursors]);

  return (
    <div ref={layerRef} className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
      {cursors.map(c => (
        <div
          key={c.id}
          className={`absolute flex items-center gap-1 select-none transition-all duration-150 ${c.color}`}
          style={{ left: c.x, top: c.y }}
        >
          <span className="w-3 h-3 rounded-full border-2 border-white shadow" style={{ background: 'currentColor' }} />
          <span className="px-2 py-1 rounded bg-white bg-opacity-90 text-xs font-bold text-blue-900 shadow border border-blue-200">
            {c.name}
          </span>
        </div>
      ))}
    </div>
  );
}
