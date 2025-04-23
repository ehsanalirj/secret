import React from 'react';

const navItems = [
  { icon: '🎨', label: 'Design' },
  { icon: '📝', label: 'Content' },
  { icon: '💻', label: 'Code' },
  { icon: '🛠️', label: 'Admin' },
  { icon: '🧩', label: 'Marketplace' },
  { icon: '⚙️', label: 'Settings' }
];

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col py-6 px-3 space-y-2 shadow-lg">
      <nav className="flex flex-col gap-2">
        {navItems.map(item => (
          <Tooltip text={`Go to ${item.label} section`}>
            <button
              key={item.label}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium hover:bg-blue-800 ${active===item.label ? 'bg-blue-800' : ''}`}
              aria-label={`Go to ${item.label} section`}
              onClick={() => onSelect(item.label)}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          </Tooltip>
        ))}
      </nav>
      <div className="mt-auto pt-8 text-xs text-blue-200 opacity-70">Role-based access | Plugins ready</div>
    </aside>
  );
}
