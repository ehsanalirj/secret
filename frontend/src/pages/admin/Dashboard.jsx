import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-[70vh] flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 drop-shadow-sm">Ecosystem Overview</h1>
          <p className="text-blue-700 text-lg mb-4 max-w-xl">
            Real-time metrics, system health, and platform-wide insights for the Vontres Restaurant SaaS ecosystem.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded bg-blue-700 text-white font-bold shadow hover:bg-blue-800 transition">Quick Action</button>
          <button className="px-4 py-2 rounded bg-white/70 text-blue-900 font-bold shadow hover:bg-blue-100 transition border border-blue-200">Export</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-900 mb-2">1,234</div>
          <div className="text-blue-600 font-medium mb-1">Active Restaurants</div>
          <div className="text-blue-400 text-xs">+12 today</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-900 mb-2">24,567</div>
          <div className="text-blue-600 font-medium mb-1">Orders Placed</div>
          <div className="text-blue-400 text-xs">+320 this hour</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-900 mb-2">98.7%</div>
          <div className="text-blue-600 font-medium mb-1">API Uptime</div>
          <div className="text-blue-400 text-xs">Last 24h</div>
        </div>
      </div>
      <div className="bg-white/80 rounded-xl shadow-lg p-8 mt-6 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Traffic by City</h2>
          <div className="h-40 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg animate-pulse flex items-center justify-center text-blue-700 font-bold text-lg">
            [Graph Placeholder]
          </div>
        </div>
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">System Health</h2>
          <div className="h-40 bg-gradient-to-r from-green-200 to-green-400 rounded-lg animate-pulse flex items-center justify-center text-green-700 font-bold text-lg">
            [System Widget Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}
