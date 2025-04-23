import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export default function NotificationCenterProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = window.localStorage.getItem('vontres_notifications');
    return saved ? JSON.parse(saved) : [];
  });
  const toastTimeouts = useRef([]);

  useEffect(() => {
    window.localStorage.setItem('vontres_notifications', JSON.stringify(history));
  }, [history]);

  function notify({ message, type = 'info', duration = 3000, action }) {
    const id = Date.now() + Math.random();
    setToasts(ts => [...ts, { id, message, type, action }]);
    setHistory(h => [
      { id, message, type, date: new Date().toISOString() },
      ...h.slice(0, 49)
    ]);
    const timeout = setTimeout(() => {
      setToasts(ts => ts.filter(t => t.id !== id));
    }, duration);
    toastTimeouts.current.push(timeout);
  }

  function clearAll() {
    setHistory([]);
    setToasts([]);
    toastTimeouts.current.forEach(clearTimeout);
    toastTimeouts.current = [];
  }

  function removeToast(id) {
    setToasts(ts => ts.filter(t => t.id !== id));
  }

  return (
    <NotificationContext.Provider value={{ notify, setPanelOpen }}>
      {children}
      {/* Toasts */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-2 items-end">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded shadow-lg text-white font-semibold animate-fade-in-up ${t.type === 'error' ? 'bg-red-600' : t.type === 'success' ? 'bg-green-600' : 'bg-blue-700'}`}
            role="alert"
            tabIndex={0}
            aria-live="polite"
          >
            {t.message}
            {t.action && (
              <button className="ml-4 underline" onClick={t.action.onClick}>{t.action.label}</button>
            )}
            <button className="ml-2 text-lg" onClick={() => removeToast(t.id)} title="Dismiss">×</button>
          </div>
        ))}
      </div>
      {/* Notification Panel */}
      {panelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-end z-[9998]" role="dialog" aria-modal="true" aria-label="Notification Center">
          <div className="bg-white w-full max-w-md h-[70vh] rounded-t-lg shadow-2xl p-6 overflow-y-auto animate-slide-up relative">
            <button className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700" onClick={() => setPanelOpen(false)} aria-label="Close Notifications">✕</button>
            <h2 className="text-xl font-bold mb-4 text-blue-900">Notifications</h2>
            {history.length === 0 ? (
              <div className="text-gray-500">No notifications yet.</div>
            ) : (
              <ul className="space-y-3">
                {history.map(n => (
                  <li key={n.id} className={`rounded px-3 py-2 shadow-sm ${n.type === 'error' ? 'bg-red-50' : n.type === 'success' ? 'bg-green-50' : 'bg-blue-50'}`}>
                    <div className="font-semibold text-blue-900 text-sm">{n.message}</div>
                    <div className="text-xs text-gray-400 mt-1">{new Date(n.date).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
            <button className="mt-6 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 font-semibold" onClick={clearAll}>Clear All</button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
