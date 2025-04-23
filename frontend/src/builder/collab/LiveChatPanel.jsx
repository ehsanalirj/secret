import React, { useEffect, useRef, useState } from 'react';

// Simple live chat using Socket.io
export default function LiveChatPanel({ username = 'User' }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Dynamically import socket.io-client
    let socket;
    import('socket.io-client').then(io => {
      socket = io.connect('http://localhost:4000');
      socketRef.current = socket;
      socket.on('connect', () => setConnected(true));
      socket.on('disconnect', () => setConnected(false));
      socket.on('chat:message', msg => {
        setMessages(msgs => [...msgs, msg]);
      });
    });
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = { user: username, text: input, time: new Date().toLocaleTimeString() };
    socketRef.current.emit('chat:message', msg);
    setMessages(msgs => [...msgs, msg]);
    setInput('');
  }

  return (
    <div className="flex flex-col h-80 bg-white rounded-xl shadow p-4 border border-blue-100">
      <div className="font-bold text-blue-900 mb-2 flex items-center gap-2">
        <span>💬</span> Live Chat {connected ? <span className="text-green-600 text-xs">● Online</span> : <span className="text-red-500 text-xs">● Offline</span>}
      </div>
      <div className="flex-1 overflow-y-auto mb-2 border rounded p-2 bg-blue-50">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-1 ${msg.user === username ? 'text-right' : 'text-left'}`}>
            <span className="font-semibold text-blue-700">{msg.user}</span>{' '}
            <span className="bg-white px-2 py-1 rounded shadow text-sm">{msg.text}</span>{' '}
            <span className="text-gray-400 text-xs">{msg.time}</span>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <form className="flex gap-2 mt-2" onSubmit={sendMessage} autoComplete="off">
        <input
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={!connected}
        />
        <button className="px-4 py-1 rounded bg-blue-700 text-white font-bold" type="submit" disabled={!connected || !input.trim()}>Send</button>
      </form>
    </div>
  );
}
