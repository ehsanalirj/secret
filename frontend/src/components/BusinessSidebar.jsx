import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/business-hub/dashboard', icon: '🏠', label: 'Dashboard' },
  { to: '/business-hub/departments', icon: '🏢', label: 'Departments' },
  { to: '/business-hub/employees', icon: '👥', label: 'Employees' },
  { to: '/business-hub/menu', icon: '📋', label: 'Menu' },
  { to: '/business-hub/orders', icon: '🛒', label: 'Orders' },
  { to: '/business-hub/hr', icon: '🧑‍💼', label: 'HR & Payroll' },
  { to: '/business-hub/inventory', icon: '📦', label: 'Inventory' },
  { to: '/business-hub/analytics', icon: '📈', label: 'Analytics' },
  { to: '/business-hub/website-builder', icon: '🖥️', label: 'Website Builder' },
  { to: '/business-hub/control-center', icon: '🛠️', label: 'Control Center' },
  { to: '/business-hub/settings', icon: '⚙️', label: 'Settings' },
];

export default function BusinessSidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white min-h-screen p-4 shadow-lg flex flex-col">
      <div className="text-2xl font-extrabold mb-8 tracking-tight flex items-center gap-2">
        <span className="text-3xl">🚀</span> Business Hub
      </div>
      <nav className="flex-1">
        <ul>
          {links.map(link => (
            <li key={link.to} className="mb-2">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-800 transition ${isActive ? 'bg-blue-800 font-bold' : ''}`
                }
              >
                <span className="text-xl">{link.icon}</span>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8 text-xs text-blue-200 opacity-80 text-center">
        &copy; {new Date().getFullYear()} Vontres Platform
      </div>
    </aside>
  );
}
