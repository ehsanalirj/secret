import React, { useState } from 'react';

const DEMO_BLOCKS = [
  { id: 1, name: 'Testimonial Slider', desc: 'A modern testimonial carousel with avatars.', preview: '🧑‍🤝‍🧑', installed: false },
  { id: 2, name: 'Pricing Table', desc: 'Responsive pricing table with 3 tiers.', preview: '💸', installed: false },
  { id: 3, name: 'Contact Form', desc: 'Accessible contact form with validation.', preview: '📧', installed: false },
  { id: 4, name: 'Gallery Grid', desc: 'Image gallery with lightbox.', preview: '🖼️', installed: false },
];

export default function BlockMarketplacePanel() {
  const [blocks, setBlocks] = useState(DEMO_BLOCKS);

  function handleInstall(id) {
    setBlocks(blocks => blocks.map(b => b.id === id ? { ...b, installed: true } : b));
    // TODO: Actually add the block to the builder's block library
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">🧩 Block Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blocks.map(block => (
          <div key={block.id} className="bg-white border rounded-xl shadow p-4 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{block.preview}</span>
              <div>
                <div className="font-bold text-blue-800 text-lg">{block.name}</div>
                <div className="text-gray-600 text-sm">{block.desc}</div>
              </div>
            </div>
            <button
              className={`mt-2 px-4 py-1 rounded font-bold ${block.installed ? 'bg-green-200 text-green-800 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              onClick={() => handleInstall(block.id)}
              disabled={block.installed}
              aria-label={block.installed ? 'Installed' : `Install ${block.name}`}
            >
              {block.installed ? 'Installed' : 'Install'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
