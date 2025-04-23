import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin/notifications', label: 'Notifications' },
  { to: '/admin/analytics', label: 'Analytics' },
  { to: '/admin/ai', label: 'AI Insights' },
  { to: '/admin/integrations', label: 'Integrations' },
  { to: '/admin/webhooks', label: 'Webhooks' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/audit-logs', label: 'Audit Logs' },
  { to: '/admin/org-switcher', label: 'Org Switcher' },
  { to: '/admin/branding', label: 'Branding' },
  { to: '/admin/api-keys', label: 'API Keys' },
  { to: '/admin/api-docs', label: 'API Docs' },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-6">Admin Panel</div>
      <nav>
        <ul>
          {links.map(link => (
            <li key={link.to} className="mb-2">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700 font-semibold' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
