import React, { useEffect } from 'react';

export default function Toast({ type = 'info', message, onClose, duration = 3500 }) {
  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const colors = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-700 text-white',
    warning: 'bg-yellow-500 text-black',
  };

  return (
    <div className={`pointer-events-auto px-4 py-3 rounded shadow-lg mb-2 min-w-[220px] max-w-xs font-medium flex items-center gap-2 animate-fadeIn ${colors[type] || colors.info}`} role="alert">
      {type === 'success' && <span>✅</span>}
      {type === 'error' && <span>❌</span>}
      {type === 'info' && <span>ℹ️</span>}
      {type === 'warning' && <span>⚠️</span>}
      <span className="flex-1">{message}</span>
      <button className="ml-2 text-lg font-bold" onClick={onClose} aria-label="Close">×</button>
    </div>
  );
}
