import React, { useState } from 'react';
import PluginSettingsDrawer from './PluginSettingsDrawer';
import SubmitPluginModal from './SubmitPluginModal';

const DEMO_PLUGINS = [
  { id: 1, name: 'Google Analytics', desc: 'Track visitor stats and traffic.', installed: false },
  { id: 2, name: 'Mailchimp Signup', desc: 'Embed a newsletter signup form.', installed: false },
  { id: 3, name: 'Stripe Payments', desc: 'Add a checkout button for products.', installed: false },
  { id: 4, name: 'Custom Code', desc: 'Insert your own HTML, CSS, or JS.', installed: false },
];

export default function PluginManagerPanel() {
  const [plugins, setPlugins] = useState(DEMO_PLUGINS);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activePlugin, setActivePlugin] = useState(null);
  const [pluginSettings, setPluginSettings] = useState(() => {
    const saved = window.localStorage.getItem('vontres_plugin_settings');
    return saved ? JSON.parse(saved) : {};
  });
  const [submitOpen, setSubmitOpen] = useState(false);


  function handleInstall(id) {
    setPlugins(plugins => plugins.map(p => p.id === id ? { ...p, installed: true } : p));
    // TODO: Actually activate the plugin in the builder
  }

  function handleUpload(e) {
    setUploading(true);
    setUploadError('');
    setTimeout(() => {
      setUploading(false);
      // Simulate error for non-.js uploads
      if (!e.target.files[0].name.endsWith('.js')) {
        setUploadError('Only .js plugin files are supported.');
      } else {
        setPlugins(plugins => [...plugins, { id: Date.now(), name: e.target.files[0].name, desc: 'Custom uploaded plugin', installed: true }]);
      }
    }, 1000);
  }

  function handleOpenSettings(plugin) {
    setActivePlugin(plugin);
    setSettingsOpen(true);
    if (!pluginSettings[plugin.id]) {
      setPluginSettings(prev => ({ ...prev, [plugin.id]: { enabled: false } }));
    }
  }

  function handleSaveSettings(settings) {
    setPluginSettings(prev => {
      const next = { ...prev, [activePlugin.id]: settings };
      window.localStorage.setItem('vontres_plugin_settings', JSON.stringify(next));
      return next;
    });
  }

  function handleSubmitPlugin({ name, desc, file }) {
    setPlugins(plugins => [
      ...plugins,
      {
        id: Date.now(),
        name,
        desc,
        installed: false,
        fileName: file.name,
        community: true,
        rating: 5,
        installs: 1 + Math.floor(Math.random() * 50)
      }
    ]);
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">🔌 Plugin Manager</h2>
      <button className="mb-4 px-4 py-2 rounded bg-blue-100 text-blue-900 font-bold hover:bg-blue-200" onClick={() => setSubmitOpen(true)}>
        🚀 Submit Plugin
      </button>
      <div className="mb-6">
        <label className="font-semibold mr-3">Upload a plugin (.js):</label>
        <input type="file" accept=".js" onChange={handleUpload} disabled={uploading} />
        {uploading && <span className="ml-2 text-blue-600">Uploading...</span>}
        {uploadError && <span className="ml-2 text-red-600">{uploadError}</span>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plugins.map(plugin => (
          <div key={plugin.id} className="bg-white border rounded-xl shadow p-4 flex flex-col gap-2">
            <div className="font-bold text-blue-800 text-lg">{plugin.name} {plugin.community && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Community</span>}</div>
            <div className="text-gray-600 text-sm">{plugin.desc}</div>
            {plugin.community && (
              <div className="flex gap-2 items-center text-xs text-yellow-700">
                ⭐ {plugin.rating} | {plugin.installs} installs
              </div>
            )}
            <div className="flex gap-2">
              <button
                className={`mt-2 px-4 py-1 rounded font-bold ${plugin.installed ? 'bg-green-200 text-green-800 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                onClick={() => handleInstall(plugin.id)}
                disabled={plugin.installed}
                aria-label={plugin.installed ? 'Installed' : `Install ${plugin.name}`}
              >
                {plugin.installed ? 'Installed' : 'Install'}
              </button>
              <button
                className="mt-2 px-3 py-1 rounded bg-gray-200 hover:bg-blue-100 text-blue-900 font-bold"
                onClick={() => handleOpenSettings(plugin)}
                aria-label={`Configure ${plugin.name}`}
              >Settings</button>
            </div>
          </div>
        ))}
      </div>
      <PluginSettingsDrawer
        plugin={activePlugin}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSave={handleSaveSettings}
        settings={activePlugin ? (pluginSettings[activePlugin.id] || {}) : {}}
        setSettings={s => setPluginSettings(prev => ({ ...prev, [activePlugin.id]: { ...prev[activePlugin.id], ...s } }))}
      />
      <SubmitPluginModal
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
        onSubmit={handleSubmitPlugin}
      />
    </div>
  );
}
