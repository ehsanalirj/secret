import React from 'react';

export default function ThemeManager({ themes, activeTheme, onSelect, onSave, onDelete }) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Theme Manager</h2>
      <p className="text-blue-800 mb-4">Save, switch, import, and export design system themes. (Live preview and theme sharing coming soon.)</p>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3">
        <div className="flex gap-2 mb-4">
          {themes?.map((theme, idx) => (
            <button
              key={theme.id || idx}
              className={`px-4 py-2 rounded border ${activeTheme === theme.id ? 'bg-blue-700 text-white' : 'bg-gray-100 text-blue-900'}`}
              onClick={() => onSelect(theme.id)}
            >
              {theme.name || `Theme ${idx + 1}`}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition" onClick={onSave}>
          + Save Current Theme
        </button>
        <button className="px-4 py-2 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition" onClick={onDelete}>
          Delete Selected Theme
        </button>
        {/* Import/export UI coming soon */}
      </div>
    </div>
  );
}
