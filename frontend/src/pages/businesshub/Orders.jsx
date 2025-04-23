import React from 'react';

export default function Orders() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="bg-white rounded shadow p-6">
        <p className="mb-2">Live order board and order history coming soon.</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Order #1234 - Pending</li>
          <li>Order #1233 - Completed</li>
        </ul>
      </div>
    </div>
  );
}
