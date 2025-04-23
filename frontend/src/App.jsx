import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Sidebar from "./components/Sidebar.jsx";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Tenants from "./pages/admin/Tenants";
import Menu from "./pages/admin/Menu";
import Users from "./pages/admin/Users";
import Analytics from "./pages/admin/Analytics";
import Marketing from "./pages/admin/Marketing";
import AI from "./pages/admin/AI";
import Security from "./pages/admin/Security";
import Support from "./pages/admin/Support";
import Billing from "./pages/admin/Billing";
import Staff from "./pages/admin/Staff";
import Supply from "./pages/admin/Supply";
import Config from "./pages/admin/Config";
import DevOps from "./pages/admin/DevOps";
import Localization from "./pages/admin/Localization";
import Sustainability from "./pages/admin/Sustainability"; // Only import once

import Features from "./pages/Features";
import Solutions from "./pages/Solutions";
import WhyVontres from "./pages/WhyVontres";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Inventory from "./pages/Inventory.jsx";
import Waste from "./pages/Waste.jsx";
import HR from "./pages/HR.jsx";
import JobBoard from "./pages/JobBoard.jsx";
import ATS from "./pages/ATS.jsx";
import EmployeePortal from "./pages/EmployeePortal.jsx";
import UltraSecureAdmin from './pages/UltraSecureAdmin';
import Login from './pages/Login';
import Landing from './pages/Landing';
import WebsiteBuilder from './pages/WebsiteBuilder';
import Olo from './pages/Olo.jsx';
import ControlCenter from './pages/ControlCenter.jsx';
import { UserProvider } from './providers/UserProvider.jsx';
import RBACRoute from './components/RBACRoute';
import NotificationCenter from './components/NotificationCenter';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AIInsights from './components/AIInsights';
import IntegrationMarketplace from './components/IntegrationMarketplace';
import ReportCenter from './components/ReportCenter';
import AuditLogViewer from './components/AuditLogViewer';
import WebhookManager from './components/WebhookManager';
import OrgSwitcher from './components/OrgSwitcher';
import BrandingConfig from './components/BrandingConfig';
import APIKeyManager from './components/APIKeyManager';
import APIDocs from './components/APIDocs';
import OnboardingModal from './components/OnboardingModal';
import SupportContact from './components/SupportContact';
import DSRConsentManager from './components/DSRConsentManager';


function AdminLogin() { return <div className="flex items-center justify-center min-h-screen"><div className="bg-white p-8 rounded shadow text-center"><h2 className="text-2xl font-bold mb-4">Admin Login</h2><p>Login form coming soon.</p></div></div>; }
function GetStarted() { return <div className="flex items-center justify-center min-h-screen"><div className="bg-white p-8 rounded shadow text-center"><h2 className="text-2xl font-bold mb-4">Get Started</h2><p>Onboarding and signup coming soon.</p></div></div>; }

export default function App() {
  const [showOnboarding, setShowOnboarding] = React.useState(() => !localStorage.getItem('onboarded'));
  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboarded', '1');
  };
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-blue-800 text-xl">Loading...</div>}>
        <UserProvider>
          {showOnboarding && <OnboardingModal onClose={handleOnboardingClose} />}
          <Router>
            <Routes>
              <Route path="/features" element={<Features />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/why-vontres" element={<WhyVontres />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/support" element={<Support />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Landing />} />
              <Route path="/olo" element={<Olo />} />
              <Route path="/olo/*" element={<Olo />} />
              <Route path="/control-center/*" element={<ControlCenter />} />

              {/* RBAC protected admin routes */}
              <Route path="/admin/*" element={<Navigate to="/olo" replace />} />

              {/* RBAC protected admin routes */}
              <Route path="/admin/*" element={
                <RBACRoute roles={['admin', 'manager']}>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="tenants" element={<Tenants />} />
                      <Route path="menu" element={<Menu />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="marketing" element={<Marketing />} />
                      <Route path="ai" element={<AI />} />
                      <Route path="security" element={<Security />} />
                      <Route path="support" element={<Support />} />
                      <Route path="billing" element={<Billing />} />
                      <Route path="staff" element={<Staff />} />
                      <Route path="supply" element={<Supply />} />
                      <Route path="config" element={<Config />} />
                      <Route path="devops" element={<DevOps />} />
                      <Route path="localization" element={<Localization />} />
                      <Route path="sustainability" element={<Sustainability />} />
                      <Route path="notifications" element={<NotificationCenter />} />
                      <Route path="analytics-dashboard" element={<AnalyticsDashboard />} />
                      <Route path="ai-insights" element={<AIInsights />} />
                      <Route path="integrations" element={<IntegrationMarketplace />} />
                      <Route path="reports" element={<ReportCenter />} />
                      <Route path="audit-logs" element={<AuditLogViewer />} />
                      <Route path="webhooks" element={<WebhookManager />} />
                      <Route path="org-switcher" element={<OrgSwitcher />} />
                      <Route path="branding" element={<BrandingConfig />} />
                      <Route path="api-keys" element={<APIKeyManager />} />
                      <Route path="api-docs" element={<APIDocs />} />
                      <Route path="support-contact" element={<SupportContact />} />
                      <Route path="dsr" element={<DSRConsentManager />} />
                      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                    </Routes>
                  </AdminLayout>
                </RBACRoute>
              } />
            </Routes>
          </Router>
        </UserProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
