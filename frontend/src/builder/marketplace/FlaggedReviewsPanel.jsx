import React, { useState } from 'react';

// Demo flagged reviews
const DEMO_FLAGGED = [
  { id: 101, block: 'Stripe Payment', author: 'Troll', comment: 'This block is trash!', rating: 1, date: '2025-04-21', reason: 'Abusive language' },
  { id: 102, block: 'Testimonial Slider', author: 'SpamBot', comment: 'Buy followers at scam.com', rating: 1, date: '2025-04-20', reason: 'Spam' }
];

export default function FlaggedReviewsPanel() {
  const [flagged, setFlagged] = useState(DEMO_FLAGGED);
  function handleRemove(id) { setFlagged(flagged => flagged.filter(r => r.id !== id)); }
  return (
    <div className="p-6 bg-red-50 rounded mb-8">
      <h3 className="font-bold text-red-800 mb-2">🚩 Flagged Reviews (Admin Only)</h3>
      {flagged.length === 0 && <div className="text-gray-500">No flagged reviews.</div>}
      <ul className="divide-y">
        {flagged.map(r => (
          <li key={r.id} className="py-2 flex flex-col md:flex-row md:items-center gap-2">
            <span className="font-bold text-blue-900">{r.block}</span>
            <span className="text-xs text-gray-600">by {r.author} ({r.rating}⭐)</span>
            <span className="text-xs text-gray-500">{r.date}</span>
            <span className="text-xs text-yellow-900 bg-yellow-100 rounded px-2 py-0.5">Reason: {r.reason}</span>
            <span className="text-gray-700">"{r.comment}"</span>
            <button className="ml-auto px-2 py-1 rounded bg-red-600 text-white text-xs font-bold hover:bg-red-800" onClick={() => handleRemove(r.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
