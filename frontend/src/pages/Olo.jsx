import React from 'react';
import LiveOrderFeedWidget from '../components/LiveOrderFeedWidget';
import AIInsightsWidget from '../components/AIInsightsWidget';
import NotificationCenterWidget from '../components/NotificationCenterWidget';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import AuditLogWidget from '../components/AuditLogWidget';
import IntegrationMarketplace from '../components/IntegrationMarketplace';
import OrgSwitcher from '../components/OrgSwitcher';
import Inventory from './Inventory';
import ErrorBoundary from '../components/ErrorBoundary';

// OLO Dashboard: Enterprise-ready, visually stunning, advanced features
export default function Olo() {
  // TODO: Replace with real user context and permissions logic
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  // Always grant full access to admin@vontres.com
  const isGlobal = user.email === 'admin@vontres.com' ? true : (user.role === 'superadmin');

  // No custom widget error boundary needed. Use ErrorBoundary class for each widget.
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col shadow-xl z-10">
        <div className="px-6 py-8 text-3xl font-extrabold tracking-tight flex items-center gap-2 border-b border-blue-800">
          <span className="">🍔</span> OLO
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-3 text-lg font-medium">
            <li><a href="#hero" className="hover:text-yellow-300 transition">🏠 Dashboard</a></li>
            <li><a href="#orders" className="hover:text-yellow-300 transition">🛒 Live Orders</a></li>
            <li><a href="#ai" className="hover:text-yellow-300 transition">🤖 AI Insights</a></li>
            <li><a href="#notifications" className="hover:text-yellow-300 transition">🔔 Notifications</a></li>
            <li><a href="#analytics" className="hover:text-yellow-300 transition">📊 Analytics</a></li>
            <li><a href="#audit" className="hover:text-yellow-300 transition">📝 Audit Logs</a></li>
            <li><a href="#integrations" className="hover:text-yellow-300 transition">🔌 Integrations</a></li>
            <li><a href="#org" className="hover:text-yellow-300 transition">🏢 Organizations</a></li>
            <li><a href="#inventory" className="hover:text-yellow-300 transition">📦 Inventory</a></li>
          </ul>
        </nav>
        <div className="px-6 py-4 text-xs text-blue-200 opacity-70 border-t border-blue-800">Enterprise Ready · {new Date().getFullYear()}</div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white/80 shadow flex items-center justify-between px-10 py-4">
          <div className="font-bold text-2xl text-blue-800 tracking-tight flex items-center gap-3">
            <span className="text-3xl">🍔</span> OLO Dashboard
            <span className="ml-4 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">Enterprise</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-4 py-2 rounded-xl font-bold shadow hover:scale-105 transition">+ New Order</button>
            <span className="text-blue-700 font-semibold">{user.email || 'User'}</span>
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="relative py-12 px-10 bg-gradient-to-r from-blue-600/80 to-blue-400/80 text-white rounded-b-3xl shadow-xl mb-8 overflow-hidden">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to Your OLO Enterprise Dashboard</h1>
            <p className="text-xl mb-6 font-medium text-blue-100">All your restaurant operations, analytics, and AI-powered insights in one beautiful place. Experience next-gen navigation, blazing speed, and advanced features designed for scale.</p>
            <div className="flex gap-4">
              <a href="#orders" className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-xl font-bold shadow hover:bg-yellow-300 transition">View Orders</a>
              <a href="#ai" className="bg-white/20 border border-white px-6 py-3 rounded-xl font-bold shadow hover:bg-white/30 transition">AI Insights</a>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-72 h-72 bg-gradient-to-tr from-yellow-200/40 to-blue-200/10 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
        </section>

        {/* Dashboard Widgets Grid */}
        <main className="flex-1 px-10 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
            {/* Live Orders */}
            <section id="orders" className="col-span-1">
              <ErrorBoundary><LiveOrderFeedWidget isGlobal={isGlobal} /></ErrorBoundary>
            </section>
            {/* AI Insights */}
            <section id="ai" className="col-span-1">
              <ErrorBoundary><AIInsightsWidget isGlobal={isGlobal} /></ErrorBoundary>
            </section>
            {/* Notifications */}
            <section id="notifications" className="col-span-1">
              <ErrorBoundary><NotificationCenterWidget isGlobal={isGlobal} /></ErrorBoundary>
            </section>
            {/* Analytics */}
            <section id="analytics" className="col-span-2 xl:col-span-2">
              <ErrorBoundary><AnalyticsDashboard isGlobal={isGlobal} /></ErrorBoundary>
            </section>
            {/* Audit Logs */}
            <section id="audit" className="col-span-1">
              <ErrorBoundary><AuditLogWidget isGlobal={isGlobal} /></ErrorBoundary>
            </section>
            {/* Integrations */}
            <section id="integrations" className="col-span-1">
              <ErrorBoundary><IntegrationMarketplace isGlobal={isGlobal} /></ErrorBoundary>
            </section>
            {/* Org Switcher */}
            <section id="org" className="col-span-1">
              <ErrorBoundary><OrgSwitcher isGlobal={isGlobal} /></ErrorBoundary>
            </section>
            {/* Inventory */}
            <section id="inventory" className="col-span-2">
              <ErrorBoundary><Inventory isGlobal={isGlobal} /></ErrorBoundary>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
