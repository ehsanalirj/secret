import React, { useState } from 'react';
import { useToast } from '../components/ToastProvider';

export default function WhiteLabelSettingsPanel() {
  const [logo, setLogo] = useState(() => window.localStorage.getItem('wl_logo') || '');
  const [brandColor, setBrandColor] = useState(() => window.localStorage.getItem('wl_brandColor') || '#2563eb');
  const [domain, setDomain] = useState(() => window.localStorage.getItem('wl_domain') || '');
  const [favicon, setFavicon] = useState(() => window.localStorage.getItem('wl_favicon') || '');
  const [supportEmail, setSupportEmail] = useState(() => window.localStorage.getItem('wl_supportEmail') || '');
  const [footerText, setFooterText] = useState(() => window.localStorage.getItem('wl_footerText') || '');
  const toast = useToast();

  function handleSave() {
    window.localStorage.setItem('wl_logo', logo);
    window.localStorage.setItem('wl_brandColor', brandColor);
    window.localStorage.setItem('wl_domain', domain);
    window.localStorage.setItem('wl_favicon', favicon);
    window.localStorage.setItem('wl_supportEmail', supportEmail);
    window.localStorage.setItem('wl_footerText', footerText);
    toast.showToast({ type: 'success', message: 'White-label settings saved!' });
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-900 flex items-center gap-2">🏷️ White-Label Settings</h2>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Logo URL</label>
        <input className="w-full border rounded px-2 py-1" value={logo} onChange={e => setLogo(e.target.value)} placeholder="https://..." />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Favicon URL</label>
        <input className="w-full border rounded px-2 py-1" value={favicon} onChange={e => setFavicon(e.target.value)} placeholder="https://.../favicon.ico" />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Brand Color</label>
        <input type="color" className="w-12 h-8 p-0 border rounded" value={brandColor} onChange={e => setBrandColor(e.target.value)} />
        <span className="ml-2 text-xs">{brandColor}</span>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Custom Domain</label>
        <input className="w-full border rounded px-2 py-1" value={domain} onChange={e => setDomain(e.target.value)} placeholder="yourdomain.com" />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Support Email</label>
        <input className="w-full border rounded px-2 py-1" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} placeholder="support@yourdomain.com" />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Footer Text</label>
        <input className="w-full border rounded px-2 py-1" value={footerText} onChange={e => setFooterText(e.target.value)} placeholder="© 2025 Your Company. All rights reserved." />
      </div>
      <button className="mt-2 px-4 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-900 w-full" onClick={handleSave}>Save Settings</button>
    </div>
  );
}
