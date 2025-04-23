import React from 'react';
import { NavLink } from 'react-router-dom';

const navSections = [
  {
    heading: 'Overview',
    items: [
      { to: '/admin/dashboard', label: 'Ecosystem', icon: 'globe' },
    ],
  },
  {
    heading: 'Management',
    items: [
      { to: '/admin/tenants', label: 'Tenants', icon: 'buildings' },
      { to: '/admin/menu', label: 'Menu', icon: 'utensils-crossed' },
      { to: '/admin/users', label: 'Users', icon: 'users' },
      { to: '/admin/staff', label: 'Staff & HR', icon: 'user-check' },
      { to: '/admin/supply', label: 'Supply Chain', icon: 'truck' },
    ],
  },
  {
    heading: 'Insights',
    items: [
      { to: '/admin/analytics', label: 'Analytics', icon: 'bar-chart' },
      { to: '/admin/marketing', label: 'Marketing', icon: 'megaphone' },
      { to: '/admin/ai', label: 'AI & Automation', icon: 'bot' },
      { to: '/admin/sustainability', label: 'Sustainability', icon: 'leaf' },
    ],
  },
  {
    heading: 'Operations',
    items: [
      { to: '/admin/security', label: 'Security', icon: 'shield' },
      { to: '/admin/support', label: 'Support', icon: 'life-buoy' },
      { to: '/admin/billing', label: 'Billing', icon: 'credit-card' },
      { to: '/admin/config', label: 'Platform Config', icon: 'settings' },
      { to: '/admin/devops', label: 'DevOps', icon: 'terminal' },
      { to: '/admin/localization', label: 'Localization', icon: 'globe-2' },
    ],
  },
];

// Lucide icons SVG mapping (minimal for demo, expand as needed)
const icons = {
  globe: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="6" ry="10" /></svg>
  ),
  buildings: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="7" height="13" /><rect x="14" y="3" width="7" height="17" /></svg>
  ),
  "utensils-crossed": (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 3l-8 8m0 0l8 8m-8-8H3m5 0v8" /></svg>
  ),
  users: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="8" cy="8" r="4" /><circle cx="16" cy="8" r="4" /><path d="M2 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" /><path d="M14 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" /></svg>
  ),
  'user-check': (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="8" cy="8" r="4" /><path d="M2 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" /><path d="M16 11l2 2 4-4" /></svg>
  ),
  truck: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" /><rect x="16" y="8" width="7" height="8" /><circle cx="5.5" cy="21.5" r="2.5" /><circle cx="18.5" cy="21.5" r="2.5" /></svg>
  ),
  'bar-chart': (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="12" width="4" height="8" /><rect x="9" y="8" width="4" height="12" /><rect x="15" y="4" width="4" height="16" /></svg>
  ),
  megaphone: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 11v-1a8 8 0 018-8h1a8 8 0 018 8v1" /><path d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2v-2" /></svg>
  ),
  bot: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="5" /><circle cx="7" cy="12" r="2" /><circle cx="17" cy="12" r="2" /></svg>
  ),
  leaf: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C7 2 2 7 2 12c0 5 5 10 10 10s10-5 10-10c0-5-5-10-10-10z" /><path d="M12 2v20" /></svg>
  ),
  shield: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l7 5v5c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V7z" /></svg>
  ),
  'life-buoy': (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><path d="M4.93 4.93l4.24 4.24M19.07 4.93l-4.24 4.24M19.07 19.07l-4.24-4.24M4.93 19.07l4.24-4.24" /></svg>
  ),
  'credit-card': (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
  ),
  settings: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  ),
  terminal: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
  ),
  'globe-2': (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" /></svg>
  ),
};

export default function Sidebar({ open = true, setOpen }) {
  return (
    <aside
      className={`z-30 fixed lg:static top-0 left-0 h-full w-64 bg-white/70 shadow-xl backdrop-blur-lg border-r border-blue-200 transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : '-translate-x-72'} min-h-screen`}
    >
      <div className="mb-8 mt-8 text-2xl font-extrabold text-blue-900 text-center tracking-wide drop-shadow-sm select-none">
        <span className="inline-block align-middle">Vontres Admin</span>
      </div>
      <nav className="flex-1 flex flex-col gap-6 px-2 overflow-y-auto">
        {navSections.map(section => (
          <div key={section.heading}>
            <div className="uppercase text-xs text-blue-500 font-bold px-2 mb-2 tracking-wider">{section.heading}</div>
            <div className="flex flex-col gap-1">
              {section.items.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded px-4 py-2 text-base font-medium transition-colors ${isActive ? 'bg-blue-700 text-white shadow' : 'hover:bg-blue-100 text-blue-900'}`
                  }
                  onClick={() => setOpen && setOpen(false)}
                >
                  <span className="w-5 h-5 flex items-center justify-center">{icons[icon]}</span>
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="mt-auto px-4 py-6 text-xs text-blue-400 text-center select-none">
        <span>Version 1.0 | Powered by Vontres</span>
      </div>
    </aside>
  );
}
