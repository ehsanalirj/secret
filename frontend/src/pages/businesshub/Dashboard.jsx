import React from 'react';
import NotificationCenterWidget from '../../components/NotificationCenterWidget.jsx';
import AIInsightsWidget from '../../components/AIInsightsWidget.jsx';
import AuditLogWidget from '../../components/AuditLogWidget.jsx';
import LiveOrderFeedWidget from '../../components/LiveOrderFeedWidget.jsx';

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Business Overview</h2>
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-4xl mb-2">💰</span>
          <div className="font-bold text-xl">$12,340</div>
          <div className="text-xs text-gray-500">Monthly Sales</div>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-4xl mb-2">🛒</span>
          <div className="font-bold text-xl">231</div>
          <div className="text-xs text-gray-500">Orders</div>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-4xl mb-2">👥</span>
          <div className="font-bold text-xl">18</div>
          <div className="text-xs text-gray-500">Active Employees</div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <NotificationCenterWidget />
        <AIInsightsWidget />
        <LiveOrderFeedWidget />
      </div>
      <div className="bg-white rounded shadow p-4 flex flex-col items-center justify-center min-h-[160px] mb-8">
        <span className="font-bold mb-2 text-blue-900">Analytics Chart</span>
        <div className="w-full h-24 bg-blue-50 rounded flex items-center justify-center text-blue-200">
          {/* Chart.js or Recharts integration coming soon */}
          [Chart Placeholder]
        </div>
      </div>
      <AuditLogWidget />
      <div className="bg-white rounded shadow p-6 mt-8">
        <h3 className="font-semibold mb-2">Recent Activity</h3>
        <ul className="text-sm text-gray-700 list-disc ml-6">
          <li>Order #1234 placed by John Doe</li>
          <li>Menu updated: Added "Vegan Burger"</li>
          <li>Inventory restocked: Tomatoes</li>
          <li>Employee Jane Smith clocked in</li>
        </ul>
      </div>
    </div>
  );
}

