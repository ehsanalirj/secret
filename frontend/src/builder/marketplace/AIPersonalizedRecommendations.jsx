import React from 'react';

const DEMO_RECOMMENDATIONS = [
  { id: 'stripe', name: 'Stripe Payment', desc: 'Accept payments with Stripe. Demo block.', preview: '💳', installs: 21, rating: 5 },
  { id: 'analytics', name: 'Analytics Dashboard', desc: 'View Google Analytics stats. Demo block.', preview: '📊', installs: 33, rating: 5 },
  { id: 'mailchimp', name: 'Mailchimp Signup', desc: 'Newsletter signup form. Demo block.', preview: '📧', installs: 27, rating: 5 },
  { id: 'airtable', name: 'Airtable Table', desc: 'Show Airtable data in a table. Demo block.', preview: '📋', installs: 19, rating: 5 },
];

export default function AIPersonalizedRecommendations({ onInstall }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-blue-900 flex items-center gap-2">🤖 Recommended for You</h2>
      <div className="flex gap-6 overflow-x-auto pb-2">
        {DEMO_RECOMMENDATIONS.map(block => (
          <div key={block.id} className="min-w-[220px] bg-white border rounded-xl shadow p-4 flex flex-col items-center">
            <div className="text-4xl mb-2">{block.preview}</div>
            <div className="font-bold text-blue-900 text-lg mb-1">{block.name}</div>
            <div className="text-gray-700 text-xs mb-2 text-center">{block.desc}</div>
            <div className="flex gap-2 text-xs mb-2">
              <span>⭐ {block.rating}</span>
              <span>⬇️ {block.installs}</span>
            </div>
            <button className="px-3 py-1 rounded bg-blue-700 text-white font-bold hover:bg-blue-900 text-xs" onClick={() => onInstall && onInstall(block.id)}>
              Install
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
