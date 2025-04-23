import React, { useEffect, useState } from 'react';

// Demo/mock users for real-time collab
const DEMO_USERS = [
  { id: 1, name: 'Alice', color: 'bg-pink-400', avatar: '/avatars/alice.png' },
  { id: 2, name: 'Bob', color: 'bg-green-400', avatar: '/avatars/bob.png' },
  { id: 3, name: 'You', color: 'bg-blue-600', avatar: '/logo192.png' },
];

export default function LiveCollaborationBar({ activeUsers = DEMO_USERS, editingBlock }) {
  // In real app, activeUsers would come from live backend
  const [users, setUsers] = useState(activeUsers);
  const [editing, setEditing] = useState(editingBlock);

  // Simulate user activity
  useEffect(() => {
    const timer = setInterval(() => {
      setEditing(Math.random() > 0.5 ? { block: 'Header', user: DEMO_USERS[1] } : null);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 border-b">
      <span className="font-semibold text-blue-900">Live Collaboration:</span>
      <div className="flex items-center gap-2">
        {users.map(u => (
          <Tooltip text={`User: ${u.name}`} key={u.id}>
            <span className={`flex items-center gap-1 ${u.color} rounded-full px-2 py-1 text-xs font-bold text-white shadow`} aria-label={`User: ${u.name}`} tabIndex={0}>
              <img src={u.avatar} alt={u.name} className="w-5 h-5 rounded-full border border-white" />
              {u.name}
            </span>
          </Tooltip>
        ))}
      </div>
      {editing && (
        <span className="ml-4 text-xs text-blue-700 animate-pulse" aria-live="polite" aria-atomic="true">{editing.user.name} is editing <b>{editing.block}</b>...</span>
      )}
    </div>
  );
}
