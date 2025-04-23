import React from 'react';

export default function BlockControls({ onEdit, onDelete, onMoveUp, onMoveDown, onDuplicate }) {
  return (
    <div className="flex gap-2 mb-2 justify-end">
      <Tooltip text="Edit block">
        <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200" aria-label="Edit block" onClick={onEdit}>Edit</button>
      </Tooltip>
      <Tooltip text="Duplicate block">
        <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200" aria-label="Duplicate block" onClick={onDuplicate}>Duplicate</button>
      </Tooltip>
      <Tooltip text="Move block up">
        <button className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200" aria-label="Move block up" onClick={onMoveUp}>↑</button>
      </Tooltip>
      <Tooltip text="Move block down">
        <button className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200" aria-label="Move block down" onClick={onMoveDown}>↓</button>
      </Tooltip>
      <Tooltip text="Delete block">
        <button className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200" aria-label="Delete block" onClick={onDelete}>Delete</button>
      </Tooltip>
    </div>
  );
}
