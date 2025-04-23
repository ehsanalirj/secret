import React from 'react';
import BusinessSidebar from '../components/BusinessSidebar';

export default function BusinessHubLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-blue-50">
      <BusinessSidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="px-8 py-4 bg-white shadow flex items-center justify-between">
          <div className="font-bold text-xl text-blue-900">Business Management</div>
          <div className="flex items-center gap-4">
            {/* Quick Actions */}
            <button className="bg-blue-100 p-2 rounded hover:bg-blue-200">+ Add Employee</button>
            <button className="bg-blue-100 p-2 rounded hover:bg-blue-200">+ New Order</button>
            <button className="bg-blue-100 p-2 rounded hover:bg-blue-200">🔔</button>
            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-800">A</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
