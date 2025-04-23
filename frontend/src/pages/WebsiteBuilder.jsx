import React, { Suspense, useState, useEffect, useRef } from "react";
import CreateAdminAccount from '../auth/CreateAdminAccount';
import ThemeCustomizer from '../builder/components/ThemeCustomizer';
import OnboardingModal from '../builder/components/OnboardingModal';
import AITitleSEOAssistant from '../builder/components/AITitleSEOAssistant'; // Import AITitleSEOAssistant
import AIContentAssistant from '../builder/components/AIContentAssistant';
import AIImageAssistant from '../builder/components/AIImageAssistant'; // Import AIImageAssistant
import LiveCursorLayer from '../builder/components/LiveCursorLayer';
import InlineCommentLayer from '../builder/components/InlineCommentLayer';
import PresenceIndicatorBar from '../builder/components/PresenceIndicatorBar';
import AccessibilityWizard from '../builder/components/AccessibilityWizard';
import ThemePresetBar from '../builder/components/ThemePresetBar';
import BlockMarketplacePanel from '../builder/marketplace/BlockMarketplacePanel';
import BlockReviewSection from '../builder/marketplace/BlockReviewSection'; // For review sentiment display
import ErrorBoundary from '../components/ErrorBoundary';

function AISuggestedBlocks() {
  const [blocks, setBlocks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    fetch('/api/block/suggested')
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch AI suggested blocks');
        return r.json();
      })
      .then(setBlocks)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <div className="p-4">Loading AI suggestions...</div>;
  if (error) return <div className="p-4 text-red-700">{error}</div>;
  if (!blocks.length) return <div className="p-4 text-gray-500">No AI suggestions at this time.</div>;
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🤖</span>
        <span className="font-bold text-blue-900">AI Suggested Blocks</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {blocks.map(block => (
          <div key={block._id} className="bg-white rounded-xl shadow p-4 border border-blue-100 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{block.preview || '🧩'}</span>
              <span className="font-bold text-blue-900">{block.name}</span>
              <span className="ml-auto px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">AI Suggested</span>
            </div>
            <div className="text-sm text-gray-700 mb-2">{block.desc}</div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <span>Installs: {block.installs}</span>
              <span>Rating: {block.rating?.toFixed(1) || '-'}</span>
            </div>
            {/* Optionally show reviews with sentiment */}
            {block.reviews && block.reviews.length > 0 && (
              <div className="border-t pt-2 mt-2">
                <div className="font-semibold text-xs text-blue-700 mb-1">Recent Reviews</div>
                {block.reviews.slice(0,2).map(r => (
                  <div key={r._id} className="text-xs mb-1 flex items-center gap-2">
                    <span className="font-bold">{r.author}</span>
                    <span>{'★'.repeat(r.rating)}</span>
                    <span className={`px-2 py-0.5 rounded-full ${r.sentiment === 'negative' ? 'bg-red-100 text-red-700' : r.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>{r.sentiment}</span>
                    {r.flagged && <span className="ml-1 px-1 bg-yellow-200 text-yellow-800 rounded">Flagged</span>}
                    <span className="text-gray-400">{new Date(r.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import PluginManagerPanel from '../builder/marketplace/PluginManagerPanel';
import CommunityBlockMarketplacePanel from '../builder/marketplace/CommunityBlockMarketplacePanel';
import WhiteLabelSettingsPanel from '../builder/client/WhiteLabelSettingsPanel';
import ClientPortalPanel from '../builder/client/ClientPortalPanel';
import PluginBlockDeveloperDocs from '../builder/docs/PluginBlockDeveloperDocs';
import BlockPluginSandbox from '../builder/docs/BlockPluginSandbox';
import Tooltip from '../builder/components/Tooltip';
import Topbar from '../builder/components/Topbar';
import Sidebar from '../builder/components/Sidebar';
import ToastProvider, { useToast } from '../builder/components/ToastProvider';
import BlockSidebar from '../builder/components/BlockSidebar';
import Canvas from '../builder/components/Canvas';
import BlockControls from '../builder/components/BlockControls';
import EditBlockModal from '../builder/components/EditBlockModal';
import { BLOCKS } from '../builder/blocks';
import DesignSystemPanel from '../builder/components/DesignSystemPanel';
import NotificationCenterProvider, { useNotifications } from '../builder/components/NotificationCenter';

// --- FeatureModal component for feature toggles modal, accessibility, keyboard trap, and animation ---
function FeatureModal({ onClose, featureList, featureToggles, toggleFeature }) {
  const modalRef = React.useRef();
  React.useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
      // Trap focus
      if (e.key === 'Tab') {
        const focusables = modalRef.current.querySelectorAll('button, [tabindex="0"]');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    // Focus modal on open
    setTimeout(() => {
      const focusables = modalRef.current.querySelectorAll('button, [tabindex="0"]');
      if (focusables.length) focusables[0].focus();
    }, 100);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in" role="dialog" aria-modal="true" aria-label="Feature Toggles">
      <div
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-xl relative animate-slide-up"
        ref={modalRef}
        tabIndex={-1}
      >
        <button
          className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700 focus:outline-blue-400"
          onClick={onClose}
          aria-label="Close Feature Toggles"
        >✕</button>
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Feature Toggles</h2>
        <div className="space-y-3">
          {featureList.map(f => (
            <div key={f.key} className="flex items-center justify-between py-2 px-3 rounded hover:bg-blue-50 transition">
              <span className="font-medium text-blue-900">{f.label}</span>
              <button
                role="switch"
                aria-checked={!!featureToggles[f.key]}
                tabIndex={0}
                onClick={() => toggleFeature(f.key)}
                className={`w-12 h-6 flex items-center rounded-full px-1 transition-colors duration-200 ${featureToggles[f.key] ? 'bg-blue-600' : 'bg-gray-300'}`}
                title={featureToggles[f.key] ? 'Disable' : 'Enable'}
              >
                <span
                  className={`h-4 w-4 bg-white rounded-full shadow transform transition-transform duration-200 ${featureToggles[f.key] ? 'translate-x-6' : ''}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function WebsiteBuilder() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) {
        setError('You must be logged in as admin to access this page.');
        setLoading(false);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }
      // Check for admin role
      if (data.user.email !== 'admin@vontres.com' && data.user.user_metadata?.role !== 'superadmin') {
        setError('Access denied. Admins only.');
        setLoading(false);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }
      setUser(data.user);
      setLoading(false);
    });
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl text-blue-800">Loading Website Builder...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-xl text-red-700" role="alert">{error}</div>;

  return (
    <ErrorBoundary>
      {/* MainWebsiteBuilder and all advanced features are only accessible to admin */}
      <MainWebsiteBuilder />
    </ErrorBoundary>
  );
}

function MainWebsiteBuilder() {
  const { notify, setPanelOpen } = useNotifications();
  // --- Feature toggles ---
  const defaultToggles = {
    Design: true,
    Content: true,
    Developer: true,
    Admin: true,
    Marketplace: true,
    Collaboration: true,
    Analytics: true,
    Accessibility: true,
    PWA: true,
    Search: true,
    Whiteboard: true,
    Embed: true,
    CDN: true,
    Docs: true,
    Microfrontends: true,
    DynamicContent: true,
    AI: true,
  };
  const [featureToggles, setFeatureToggles] = React.useState(() => {
    const saved = window.localStorage.getItem('vontres_feature_toggles');
    return saved ? JSON.parse(saved) : defaultToggles;
  });
  React.useEffect(() => {
    window.localStorage.setItem('vontres_feature_toggles', JSON.stringify(featureToggles));
  }, [featureToggles]);

  function toggleFeature(feature) {
    setFeatureToggles(toggles => {
      const next = { ...toggles, [feature]: !toggles[feature] };
      notify({
        message: `${feature} ${next[feature] ? 'enabled' : 'disabled'}`,
        type: next[feature] ? 'success' : 'info',
      });
      return next;
    });
  }

  // Dynamically import all panels (code splitting)
  const BlogManager = React.lazy(() => import('../builder/content/BlogManager'));
  const RichTextEditor = React.lazy(() => import('../builder/content/RichTextEditor'));
  const MediaLibrary = React.lazy(() => import('../builder/content/MediaLibrary'));
  const CommentSystem = React.lazy(() => import('../builder/content/CommentSystem'));
  const SEOEditor = React.lazy(() => import('../builder/content/SEOEditor'));
  const FormBuilder = React.lazy(() => import('../builder/content/FormBuilder'));
  const ThemeManager = React.lazy(() => import('../builder/design/ThemeManager'));
  const AnimationBuilder = React.lazy(() => import('../builder/design/AnimationBuilder'));
  const CodePanel = React.lazy(() => import('../builder/dev/CodePanel'));
  const APIManager = React.lazy(() => import('../builder/dev/APIManager'));
  const PluginManager = React.lazy(() => import('../builder/dev/PluginManager'));
  const UserManager = React.lazy(() => import('../builder/admin/UserManager'));
  const AuditLog = React.lazy(() => import('../builder/admin/AuditLog'));
  const BillingPanel = React.lazy(() => import('../builder/admin/BillingPanel'));
  const SettingsPanel = React.lazy(() => import('../builder/admin/SettingsPanel'));
  const MarketplacePanel = React.lazy(() => import('../builder/marketplace/MarketplacePanel'));
  const CollaborationPanel = React.lazy(() => import('../builder/collab/CollaborationPanel'));
  const AnalyticsDashboard = React.lazy(() => import('../builder/analytics/AnalyticsDashboard'));
  const AccessibilityPanel = React.lazy(() => import('../builder/accessibility/AccessibilityPanel'));
  const PWAPanel = React.lazy(() => import('../builder/pwa/PWAPanel'));
  const SearchPanel = React.lazy(() => import('../builder/search/SearchPanel'));
  const WhiteboardPanel = React.lazy(() => import('../builder/whiteboard/WhiteboardPanel'));
  const EmbedManager = React.lazy(() => import('../builder/embed/EmbedManager'));
  const CDNPanel = React.lazy(() => import('../builder/cdn/CDNPanel'));
  const DocumentationPanel = React.lazy(() => import('../builder/docs/DocumentationPanel'));
  const MicrofrontendPanel = React.lazy(() => import('../builder/microfrontends/MicrofrontendPanel'));
  const DynamicContentPanel = React.lazy(() => import('../builder/dynamic/DynamicContentPanel'));
  const AIAssistantPanel = React.lazy(() => import('../builder/ai/AIAssistantPanel'));
  const AIImagePanel = React.lazy(() => import('../builder/ai/AIImagePanel'));
  const [activeModule, setActiveModule] = useState('Design');
  const [showDesignSystem, setShowDesignSystem] = useState(false);
  const [designSettings, setDesignSettings] = useState({});

  // --- FIX: Add missing builder state and handlers ---
  const [blocks, setBlocks] = useState([]);
  const [editBlock, setEditBlock] = useState(null);
  const [editData, setEditData] = useState(null);
  function handleEditBlock(block, i) {
    setEditBlock({ block, index: i });
    setEditData(block.data);
  }
  function handleDeleteBlock(i) {
    setBlocks(blocks => blocks.filter((_, idx) => idx !== i));
  }
  function handleDuplicateBlock(i) {
    setBlocks(blocks => {
      const newBlocks = [...blocks];
      newBlocks.splice(i + 1, 0, { ...blocks[i], id: Date.now() });
      return newBlocks;
    });
  }
  function handleMoveBlock(i, dir) {
    setBlocks(blocks => {
      const newBlocks = [...blocks];
      const [removed] = newBlocks.splice(i, 1);
      if (dir === 'up') newBlocks.splice(i - 1, 0, removed);
      else if (dir === 'down') newBlocks.splice(i + 1, 0, removed);
      return newBlocks;
    });
  }
  function handleSaveEdit(data) {
    setBlocks(blocks =>
      blocks.map((b, idx) =>
        idx === (editBlock ? editBlock.index : -1) ? { ...b, data } : b
      )
    );
    setEditBlock(null);
    setEditData(null);
  }
  // --- END FIX ---

  const DEFAULT_THEME = {
    text: '#111827',
    borderRadius: 12,
    font: 'Inter',
    darkMode: false
  };
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('vontres_theme');
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => !window.localStorage.getItem('onboarding_complete'));

  useEffect(() => {
    // Apply theme as CSS vars
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--font', theme.font);
    root.style.setProperty('--radius', theme.borderRadius + 'px');
    if (theme.darkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [theme]);

  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [highContrast, setHighContrast] = useState(() => {
    const saved = window.localStorage.getItem('vontres_high_contrast');
    return saved === 'true';
  });
  React.useEffect(() => {
    window.localStorage.setItem('vontres_high_contrast', highContrast);
  }, [highContrast]);
  // Add/remove class on root div
  React.useEffect(() => {
    const root = document.body;
    if (highContrast) root.classList.add('high-contrast');
    else root.classList.remove('high-contrast');
  }, [highContrast]);
  const featureList = [
    { key: 'Blog', label: 'Blog Manager' },
    { key: 'Media', label: 'Media Library' },
    { key: 'Forms', label: 'Form Builder' },
    { key: 'Comments', label: 'Comment System' },
    { key: 'SEO', label: 'SEO Editor' },
    { key: 'Design', label: 'Design System' },
    { key: 'Developer', label: 'Developer Tools' },
    { key: 'Admin', label: 'Admin Panel' },
    { key: 'Marketplace', label: 'Marketplace' },
    { key: 'Collaboration', label: 'Collaboration' },
    { key: 'Analytics', label: 'Analytics' },
    { key: 'Accessibility', label: 'Accessibility' },
    { key: 'PWA', label: 'PWA' },
    { key: 'Search', label: 'Search' },
    { key: 'Whiteboard', label: 'Whiteboard' },
    { key: 'Embed', label: 'Embed Manager' },
    { key: 'CDN', label: 'CDN' },
    { key: 'Docs', label: 'Documentation' },
    { key: 'Microfrontends', label: 'Microfrontends' },
    { key: 'DynamicContent', label: 'Dynamic Content' },
    { key: 'AI', label: 'AI Assistant' },
  ];

  const LiveCollaborationBar = require('../builder/components/LiveCollaborationBar').default;
  return (
    <div className="min-h-screen flex flex-col" style={{
      background: theme.background,
      color: theme.text,
      fontFamily: theme.font,
      borderRadius: theme.borderRadius,
      transition: 'background 0.3s, color 0.3s, border-radius 0.3s',
    }}>
      {/* Topbar */}
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm z-20">
        <Tooltip text="Guided onboarding & help">
          <button
            className="ml-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-lg font-bold"
            aria-label="Show Guided Onboarding"
            onClick={() => setShowOnboarding(true)}
          >❓</button>
        </Tooltip>
        <div className="flex items-center gap-3">
          <Tooltip text="Customize theme: colors, font, dark mode">
            <button
              className="px-3 py-1 rounded bg-gray-100 text-blue-700 hover:bg-blue-100 font-semibold"
              onClick={() => setShowThemeCustomizer(true)}
              aria-label="Customize Theme"
            >🎨 Theme</button>
          </Tooltip>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-extrabold text-blue-900 tracking-tight">VONTRES Builder</span>
          <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Alpha</span>
        </div>
        <div className="flex items-center gap-3">
          <Tooltip text="Feature toggles">
            <button className="px-3 py-1 rounded hover:bg-blue-50" aria-label="Feature Toggles" onClick={() => setShowFeatureModal(true)}>⚙️ Features</button>
          </Tooltip>
          <Tooltip text="Toggle high contrast mode for accessibility">
            <button className={`px-3 py-1 rounded font-bold ${highContrast ? 'bg-yellow-400 text-black' : 'hover:bg-blue-50'}`} aria-pressed={highContrast} onClick={() => setHighContrast(h => !h)}>
              <span aria-hidden>🌓</span> {highContrast ? 'Contrast On' : 'Contrast Off'}
            </button>
          </Tooltip>
          <Tooltip text="Notifications">
            <button className="px-3 py-1 rounded hover:bg-blue-50" aria-label="Notifications" onClick={() => setPanelOpen(true)}>
              <span role="img" aria-label="Notifications">🔔</span>
            </button>
          </Tooltip>
          <Tooltip text="Undo">
            <button className="px-3 py-1 rounded hover:bg-blue-50" aria-label="Undo">⟲</button>
          </Tooltip>
          <Tooltip text="Redo">
            <button className="px-3 py-1 rounded hover:bg-blue-50" aria-label="Redo">⟳</button>
          </Tooltip>
          <Tooltip text="Preview site">
            <button className="px-3 py-1 rounded hover:bg-blue-50" aria-label="Preview">👁️ Preview</button>
          </Tooltip>
          <Tooltip text="Publish your site">
            <button className="px-4 py-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition" aria-label="Publish" onClick={() => notify({ message: 'Site published!', type: 'success' })}>Publish</button>
          </Tooltip>
          <div className="ml-4 flex items-center gap-2">
            <img src="/logo192.png" alt="User" className="w-8 h-8 rounded-full border" />
            <span className="text-sm text-gray-700">Admin</span>
          </div>
        </div>
      </header>
      {/* Presence Indicator Bar */}
      <PresenceIndicatorBar />
      {/* Live Collaboration Bar */}
      <LiveCollaborationBar />
      {showFeatureModal && (
        <FeatureModal onClose={() => setShowFeatureModal(false)} featureList={featureList} featureToggles={featureToggles} toggleFeature={toggleFeature} />
      )}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col py-6 px-3 space-y-2 shadow-lg">
          <nav className="flex flex-col gap-2">
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Design' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Design')}><span>🎨</span> Design</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Content' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Content')}><span>📝</span> Content</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Developer' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Developer')}><span>💻</span> Developer</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Admin' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Admin')}><span>🛠️</span> Admin</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Marketplace' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Marketplace')}><span>🧩</span> Marketplace</button>
           <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'PluginManager' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('PluginManager')}><span>🔌</span> Plugin Manager</button>
           <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'CommunityBlocks' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('CommunityBlocks')}><span>🧱</span> Community Blocks</button>
           <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'WhiteLabel' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('WhiteLabel')}><span>🏷️</span> White-Label</button>
           <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'ClientPortal' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('ClientPortal')}><span>👥</span> Client Portal</button>
           <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'DevDocs' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('DevDocs')}><span>📚</span> Developer Docs</button>
           <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Sandbox' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Sandbox')}><span>🧪</span> Sandbox</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Collaboration' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Collaboration')}><span>🤝</span> Collaboration</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Analytics' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Analytics')}><span>📊</span> Analytics</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Accessibility' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Accessibility')}><span>♿</span> Accessibility</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'PWA' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('PWA')}><span>📱</span> PWA</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Search' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Search')}><span>🔍</span> Search</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Whiteboard' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Whiteboard')}><span>📝</span> Whiteboard</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Embed' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Embed')}><span>🔗</span> Embed</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'CDN' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('CDN')}><span>🚀</span> CDN</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Docs' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Docs')}><span>📖</span> Docs</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'Microfrontends' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('Microfrontends')}><span>🧬</span> Microfrontends</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'DynamicContent' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('DynamicContent')}><span>⚡</span> Dynamic</button>
            <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${activeModule === 'AI' ? 'bg-blue-800' : 'hover:bg-blue-800'}`} onClick={() => setActiveModule('AI')}><span>🤖</span> AI</button>
          </nav>
          <div className="mt-auto pt-8 text-xs text-blue-200 opacity-70">Role-based access | Plugins ready</div>
          {activeModule === 'Design' && (
            <div className="flex flex-col">
              <BlockSidebar onAddBlock={handleAddBlock} />
              <button
                className="mt-4 mb-2 px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition w-48 mx-auto"
                onClick={() => setShowDesignSystem(true)}
              >
                🎨 Open Design System
              </button>
            </div>
          )}
        </aside>
        <main className="flex-1 flex flex-col" style={{ background: 'var(--background)', color: 'var(--text)', fontFamily: 'var(--font)' }}>
          {/* Feature Toggle Panel */}
          <div className="p-4 bg-gray-50 border-b flex gap-6 items-center">
            <div className="font-bold text-gray-700">Feature Toggles:</div>
            {Object.keys(featureToggles).map(feature => (
              <label key={feature} className="flex items-center gap-1 text-xs">
                <input
                  type="checkbox"
                  checked={featureToggles[feature]}
                  onChange={() => toggleFeature(feature)}
                  className="accent-blue-600"
                />
                {feature}
              </label>
            ))}
          </div>
          {showDesignSystem && (
            <DesignSystemPanel
              settings={designSettings}
              onChange={setDesignSettings}
            />
          )}
          <React.Suspense fallback={<div className="p-8">Loading module...</div>}>
            {activeModule === 'Design' && featureToggles.Design && (
              <>
                <ThemeManager />
                <AnimationBuilder />
              </>
            )}
            {activeModule === 'Content' && featureToggles.Content && (
              <>
                {featureToggles.BlogManager !== false && <BlogManager />}
                {featureToggles.RichTextEditor !== false && <RichTextEditor value={''} onChange={() => {}} />}
                {featureToggles.MediaLibrary !== false && <MediaLibrary />}
                {featureToggles.CommentSystem !== false && <CommentSystem />}
                {featureToggles.SEOEditor !== false && <SEOEditor meta={{}} onChange={() => {}} />}
                {featureToggles.FormBuilder !== false && <FormBuilder />}
              </>
            )}
            {activeModule === 'Developer' && featureToggles.Developer && (
              <>
                <CodePanel />
                <APIManager />
                <PluginManager />
              </>
            )}
            {activeModule === 'Admin' && featureToggles.Admin && (
              <>
                <UserManager />
                <AuditLog />
                <BillingPanel />
                <SettingsPanel />
              </>
            )}
            {activeModule === 'Marketplace' && featureToggles.Marketplace && (
  <>
    <MarketplacePanel />
    <AISuggestedBlocks />
  </>
)}
            {activeModule === 'PluginManager' && <PluginManagerPanel />}
            {activeModule === 'CommunityBlocks' && <CommunityBlockMarketplacePanel />}
            {activeModule === 'WhiteLabel' && <WhiteLabelSettingsPanel />}
            {activeModule === 'ClientPortal' && <ClientPortalPanel />}
            {activeModule === 'DevDocs' && <PluginBlockDeveloperDocs />}
            {activeModule === 'Sandbox' && <BlockPluginSandbox />}
            {activeModule === 'Collaboration' && featureToggles.Collaboration && <CollaborationPanel />}
            {activeModule === 'Analytics' && featureToggles.Analytics && <AnalyticsDashboard />}
            {activeModule === 'Accessibility' && featureToggles.Accessibility && <AccessibilityPanel />}
            {activeModule === 'PWA' && featureToggles.PWA && <PWAPanel />}
            {activeModule === 'Search' && featureToggles.Search && <SearchPanel />}
            {activeModule === 'Whiteboard' && featureToggles.Whiteboard && <WhiteboardPanel />}
            {activeModule === 'Embed' && featureToggles.Embed && <EmbedManager />}
            {activeModule === 'CDN' && featureToggles.CDN && <CDNPanel />}
            {activeModule === 'Docs' && featureToggles.Docs && <DocumentationPanel />}
            {activeModule === 'Microfrontends' && featureToggles.Microfrontends && <MicrofrontendPanel />}
            {activeModule === 'DynamicContent' && featureToggles.DynamicContent && <DynamicContentPanel />}
            {activeModule === 'AI' && featureToggles.AI && (
              <>
                <AIAssistantPanel />
                <AIImagePanel />
              </>
            )}
          </React.Suspense>
        {/* Theme Preset Bar */}
        <ThemePresetBar onApply={preset => setTheme(theme => ({ ...theme, ...preset }))} />
        {/* Live Collaboration Overlays */}
        <LiveCursorLayer />
        <InlineCommentLayer />
        <Canvas>
          {blocks && blocks.length === 0 ? null : (
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
              {blocks && blocks.map((block, i) => {
                const blockDef = BLOCKS.find(b => b.type === block.type);
                const BlockComponent = blockDef?.component;
                return (
                  <div key={block.id} className="p-6 bg-white rounded-xl shadow border border-blue-100 relative group">
                    <BlockControls
                      onEdit={() => handleEditBlock(block, i)}
                      onDelete={() => handleDeleteBlock(i)}
                      onDuplicate={() => handleDuplicateBlock(i)}
                      onMoveUp={() => i > 0 && handleMoveBlock(i, 'up')}
                      onMoveDown={() => i < blocks.length - 1 && handleMoveBlock(i, 'down')}
                    />
                    {BlockComponent ? <BlockComponent data={block.data} /> : <span className="font-bold text-blue-700">{block.type} Block</span>}
                  </div>
                );
              })}
            </div>
          )}
          {editBlock && (
            <EditBlockModal
              block={BLOCKS.find(b => b.type === editBlock.block.type)}
              data={editData}
              onSave={handleSaveEdit}
              onClose={() => setEditBlock(null)}
            />
          )}
        </Canvas>
        {/* Role-based panel placeholder */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 rounded-xl p-4 shadow text-blue-900">
            <b>Designer Tools</b>
              <ul className="list-disc ml-5 mt-2 text-sm">
                <li>Design system manager</li>
                <li>Theme/colors/typography</li>
                <li>Asset & section library</li>
                <li>Animation/interactions</li>
              </ul>
            </div>
            <div className="bg-blue-100 rounded-xl p-4 shadow text-blue-900">
              <b>Content Tools</b>
              <ul className="list-disc ml-5 mt-2 text-sm">
                <li>Blog & page manager</li>
                <li>Rich text/Markdown editor</li>
                <li>Comments & scheduling</li>
                <li>SEO & analytics</li>
              </ul>
            </div>
            <div className="bg-blue-100 rounded-xl p-4 shadow text-blue-900">
              <b>Developer Tools</b>
              <ul className="list-disc ml-5 mt-2 text-sm">
                <li>Custom code blocks & SDK</li>
                <li>API & integrations</li>
                <li>Performance & testing</li>
                <li>Export & CI/CD</li>
              </ul>
            </div>
          </div>
          {/* Plugins/addons section placeholder */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-700 flex items-center gap-3">
            <span className="text-xl">🧩</span> <span>Plugin/addon system coming soon — install anything!</span>
          </div>
        </main>
      </div>
    </div>
  );
}

