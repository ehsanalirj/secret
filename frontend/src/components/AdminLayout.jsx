import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white/80 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded hover:bg-blue-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
          </button>
          <span className="text-2xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm">Vontres Admin</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <button className="p-2 rounded hover:bg-blue-100 relative">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          {/* User avatar */}
          <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-800">A</div>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar />
        {/* Main content */}
        <main className="flex-1 p-8 lg:ml-64 transition-all duration-300">
          {children}
        </main>
      </div>
      {/* Footer */}
      <footer className="px-8 py-4 bg-white/80 shadow-inner backdrop-blur-md text-center text-blue-900 text-sm">
        &copy; {new Date().getFullYear()} Vontres Platform. All rights reserved.
      </footer>
    </div>
  );
}
