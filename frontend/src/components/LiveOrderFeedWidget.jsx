import React, { useEffect, useRef } from 'react';
import useOrders from '../hooks/useOrders';
import { io } from 'socket.io-client';

export default function LiveOrderFeedWidget() {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
  const { orders, loading, error } = useOrders(token);
  const [liveOrders, setLiveOrders] = React.useState([]);
  const socketRef = useRef(null);

  // Merge initial orders with live incoming orders
  useEffect(() => {
    setLiveOrders(orders || []);
  }, [orders]);

  useEffect(() => {
    // Connect to Socket.IO backend
    const socket = io(window.location.origin, { transports: ['websocket'] });
    socketRef.current = socket;
    socket.on('order:new', order => {
      setLiveOrders(prev => {
        // Avoid duplicates
        if (prev.find(o => o._id === order._id)) return prev;
        return [order, ...prev].slice(0, 20);
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-white rounded shadow p-4 max-w-md w-full">
      <h4 className="font-bold mb-2">Live Order Feed</h4>
      {loading && <div className="text-xs text-blue-400">Loading...</div>}
      {error && <div className="text-xs text-red-500">{error}</div>}
      <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
        {(liveOrders || []).slice(0, 10).map(order => (
          <li key={order._id} className="py-2 text-xs flex flex-col">
            <span className="font-semibold text-green-700">Order #{order._id?.slice(-5)}</span>
            <span className="text-gray-500">{order.customer?.name || 'Unknown Customer'}</span>
            <span className="text-gray-400">Total: ${order.total?.toFixed(2) || '0.00'}</span>
            <span className="text-gray-400">Status: {order.status}</span>
            <span className="text-gray-400">{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</span>
          </li>
        ))}
        {!loading && (!liveOrders || liveOrders.length === 0) && (
          <li className="py-2 text-xs text-gray-400">No recent orders.</li>
        )}
      </ul>
    </div>
  );
}
