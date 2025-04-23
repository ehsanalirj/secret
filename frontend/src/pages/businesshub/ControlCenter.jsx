import React from 'react';
import AdminLayout from '../../components/AdminLayout.jsx';
import AnalyticsDashboard from '../../components/AnalyticsDashboard.jsx';
import NotificationCenter from '../../components/NotificationCenter.jsx';
import ReportCenter from '../../components/ReportCenter.jsx';
import APIKeyManager from '../../components/APIKeyManager.jsx';

export default function ControlCenter() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold mb-4">Control Center</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Analytics</h2>
            <AnalyticsDashboard />
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            <NotificationCenter />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Reports</h2>
            <ReportCenter />
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">API Keys</h2>
            <APIKeyManager />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
