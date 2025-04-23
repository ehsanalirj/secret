import React from 'react';

export default function Topbar({ user = 'Admin', onUndo, onRedo, onPreview, onPublish }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm z-20">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-extrabold text-blue-900 tracking-tight">VONTRES Builder</span>
        <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Alpha</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-3 py-1 rounded hover:bg-blue-50" title="Undo" onClick={onUndo}>⟲</button>
        <button className="px-3 py-1 rounded hover:bg-blue-50" title="Redo" onClick={onRedo}>⟳</button>
        <button className="px-3 py-1 rounded hover:bg-blue-50" title="Preview" onClick={onPreview}>👁️ Preview</button>
        <button className="px-4 py-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition" onClick={onPublish}>Publish</button>
        <div className="ml-4 flex items-center gap-2">
          <img src="/logo192.png" alt="User" className="w-8 h-8 rounded-full border" />
          <span className="text-sm text-gray-700">{user}</span>
        </div>
      </div>
    </header>
  );
}
