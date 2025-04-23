import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Tenants from './admin/Tenants';

const adminSidebarLinks = [
  { label: 'Dashboard', icon: '📊', path: '' },
  { label: 'Tenants', icon: '🏢', path: 'tenants' },
  { label: 'Users', icon: '👤', path: 'users' },
  { label: 'Roles', icon: '🛡️', path: 'roles' },
  { label: 'Feature Flags', icon: '🚩', path: 'feature-flags' },
  { label: 'Analytics', icon: '📈', path: 'analytics' },
  { label: 'Plugins', icon: '🧩', path: 'plugins' },
  { label: 'API Keys', icon: '🔑', path: 'api-keys' },
  { label: 'Compliance', icon: '✅', path: 'compliance' },
  { label: 'Support', icon: '🆘', path: 'support' },
];

function Placeholder({ title, description }) {
  return (
    <div className="bg-white rounded shadow p-10">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

export default function ControlCenter() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentSection = location.pathname.split('/control-center/')[1] || '';

  // Dashboard widgets config for navigation
  const dashboardWidgets = [
    {
      title: 'Tenant Manager',
      description: 'Create, edit, and manage all restaurant tenants and branches.',
      path: 'tenants',
    },
    {
      title: 'User & Role Management',
      description: 'Assign roles, manage permissions, and onboard new admins.',
      path: 'users',
    },
    {
      title: 'Feature Flags',
      description: 'Toggle features and experiments across tenants and plans.',
      path: 'feature-flags',
    },
    {
      title: 'Global Analytics',
      description: 'View platform-wide usage, growth, and error heatmaps.',
      path: 'analytics',
    },
    {
      title: 'Plugin Marketplace',
      description: 'Install and manage verified plugins and custom extensions.',
      path: 'plugins',
    },
    {
      title: 'API Management',
      description: 'Manage API keys, rate limits, and integration logs.',
      path: 'api-keys',
    },
    {
      title: 'Compliance & Security',
      description: 'Audit logs, access reviews, and compliance dashboards.',
      path: 'compliance',
    },
    {
      title: 'Support & Incident Center',
      description: 'Monitor incidents, respond to alerts, and escalate support cases.',
      path: 'support',
    },
    {
      title: 'Developer Portal',
      description: 'API docs, SDKs, and integration templates for developers.',
      path: 'developer-portal',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col p-4">
        <div className="font-bold text-2xl mb-8 text-blue-700 flex items-center gap-2">
          <span>🛡️</span> Control Center
        </div>
        <nav className="flex flex-col gap-3">
          {adminSidebarLinks.map(link => (
            <button
              key={link.label}
              className={`flex items-center gap-3 px-3 py-2 rounded text-left transition-all ${currentSection === link.path ? 'bg-blue-100 font-bold text-blue-800' : 'hover:bg-blue-50 text-gray-700'}`}
              onClick={() => navigate(`/control-center/${link.path}`)}
            >
              <span>{link.icon}</span> {link.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Welcome, Superadmin</h1>
            <div className="text-gray-500">Vontres Global Admin Panel</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full font-semibold">Enterprise</span>
            <span className="text-gray-700 font-medium">admin@vontres.com</span>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
                {dashboardWidgets.map(widget => (
                  <section
                    key={widget.title}
                    className="col-span-1 bg-white rounded shadow p-6 cursor-pointer hover:ring hover:ring-blue-200 transition"
                    onClick={() => navigate(`/control-center/${widget.path}`)}
                  >
                    <h2 className="font-bold text-lg mb-2">{widget.title}</h2>
                    <p className="text-gray-500">{widget.description}</p>
                  </section>
                ))}
              </div>
            }
          />
          <Route path="tenants" element={<Tenants />} />
          <Route path="users" element={<Placeholder title="User & Role Management" description="Assign roles, manage permissions, and onboard new admins." />} />
          <Route path="roles" element={<Placeholder title="Role Management" description="Define roles and assign granular permissions." />} />
          <Route path="feature-flags" element={<Placeholder title="Feature Flags" description="Toggle features and experiments across tenants and plans." />} />
          <Route path="analytics" element={<Placeholder title="Global Analytics" description="View platform-wide usage, growth, and error heatmaps." />} />
          <Route path="plugins" element={<Placeholder title="Plugin Marketplace" description="Install and manage verified plugins and custom extensions." />} />
          <Route path="api-keys" element={<Placeholder title="API Management" description="Manage API keys, rate limits, and integration logs." />} />
          <Route path="compliance" element={<Placeholder title="Compliance & Security" description="Audit logs, access reviews, and compliance dashboards." />} />
          <Route path="support" element={<Placeholder title="Support & Incident Center" description="Monitor incidents, respond to alerts, and escalate support cases." />} />
          <Route path="developer-portal" element={<Placeholder title="Developer Portal" description="API docs, SDKs, and integration templates for developers." />} />
        </Routes>
      </main>
    </div>
  );
}
