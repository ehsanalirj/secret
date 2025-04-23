import React from 'react';
import { BLOCKS } from '../blocks';

export default function BlockSidebar({ onAddBlock }) {
  return (
    <div className="w-56 bg-white border-r border-blue-100 p-4 flex flex-col gap-2">
      <h2 className="text-blue-700 text-lg font-bold mb-2">Blocks</h2>
      <div className="flex flex-col gap-2">
        {BLOCKS.map(block => (
          <Tooltip text={`Add ${block.name} block`}>
            <button
              key={block.type}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 border border-blue-100"
              aria-label={`Add ${block.name} block`}
              onClick={() => onAddBlock(block.type)}
            >
              <span className="text-xl">{block.icon}</span> <span>{block.name}</span>
            </button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
