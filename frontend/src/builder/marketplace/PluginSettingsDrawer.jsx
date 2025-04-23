import React from 'react';

export default function PluginSettingsDrawer({ plugin, open, onClose, onSave, settings, setSettings }) {
  if (!plugin || !open) return null;

  function handleChange(e) {
    setSettings(s => ({ ...s, [e.target.name]: e.target.value }));
  }

  function handleToggle(e) {
    setSettings(s => ({ ...s, enabled: !s.enabled }));
  }

  function handleSave() {
    if (onSave) onSave(settings);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-40 animate-fadeIn">
      <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-xl w-full max-w-md p-6 animate-slide-up relative">
        <button className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700" onClick={onClose} aria-label="Close Plugin Settings">✕</button>
        <h3 className="text-xl font-bold mb-3 text-blue-900 flex items-center gap-2">⚙️ {plugin.name} Settings</h3>
        <div className="mb-4 flex items-center gap-2">
          <label className="font-semibold">Enabled:</label>
          <input type="checkbox" checked={!!settings.enabled} onChange={handleToggle} />
        </div>
        {plugin.name === 'Google Analytics' && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">Tracking ID</label>
            <input name="trackingId" className="w-full border rounded px-2 py-1" value={settings.trackingId||''} onChange={handleChange} placeholder="UA-XXXXXXXXX-X" />
          </div>
        )}
        {plugin.name === 'Mailchimp Signup' && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">API Key</label>
            <input name="apiKey" className="w-full border rounded px-2 py-1" value={settings.apiKey||''} onChange={handleChange} placeholder="Mailchimp API Key" />
          </div>
        )}
        {plugin.name === 'Stripe Payments' && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">Stripe API Key</label>
            <input name="stripeKey" className="w-full border rounded px-2 py-1" value={settings.stripeKey||''} onChange={handleChange} placeholder="sk_live_..." />
          </div>
        )}
        {plugin.name === 'Custom Code' && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">Custom JS</label>
            <textarea name="customJs" className="w-full border rounded px-2 py-1" value={settings.customJs||''} onChange={handleChange} placeholder="// Your JS here..." rows={4} />
          </div>
        )}
        <button className="mt-2 px-4 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-900 w-full" onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
}
