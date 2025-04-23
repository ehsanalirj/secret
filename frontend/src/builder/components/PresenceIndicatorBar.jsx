import React from 'react';

// Accepts users as [{ user, lastActive }]
export default function PresenceIndicatorBar({ users = [] }) {
  return (
    <div className="flex gap-3 items-center px-4 py-2 bg-blue-50 border-b border-blue-200 text-sm">
      <span className="font-bold text-blue-900 mr-2">Team Presence:</span>
      {users.length === 0 && <span className="text-gray-400">No team members online</span>}
      {users.map((u, i) => {
        // Assign a color based on index or username for demo
        const colors = ['bg-blue-600', 'bg-pink-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400'];
        const color = colors[i % colors.length];
        const status = Date.now() - u.lastActive < 15000 ? 'online' : 'away';
        return (
          <span key={u.user} className={`flex items-center gap-1 px-2 py-1 rounded ${color} bg-opacity-70`}>
            <span className="w-2 h-2 rounded-full inline-block mr-1" style={{ background: status === 'online' ? '#22c55e' : '#e5e7eb' }}></span>
            {u.user}
            <span className="text-xs ml-1 text-gray-700">({status})</span>
          </span>
        );
      })}
    </div>
  );
}
