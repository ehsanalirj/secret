import React from 'react';

const DEMO_PRESETS = [
  { id: 1, name: 'Modern Blue', primary: '#2563eb', background: '#f1f5f9', font: 'Inter' },
  { id: 2, name: 'Dark Mode', primary: '#111827', background: '#18181b', font: 'Roboto' },
  { id: 3, name: 'Sunset', primary: '#f59e42', background: '#fff7ed', font: 'Lato' },
];

export default function ThemePresetBar({ onApply, presets = DEMO_PRESETS }) {
  return (
    <div className="flex gap-3 items-center px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm">
      <span className="font-bold text-gray-700 mr-2">Theme Presets:</span>
      {presets.map(p => (
        <button
          key={p.id}
          className="px-3 py-1 rounded border font-semibold shadow-sm hover:bg-blue-50"
          style={{ background: p.background, color: p.primary, fontFamily: p.font }}
          onClick={() => onApply && onApply(p)}
          aria-label={`Apply theme preset: ${p.name}`}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}
