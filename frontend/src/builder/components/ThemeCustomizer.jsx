import React, { useState, useEffect } from 'react';

const DEFAULT_THEME = {
  primary: '#2563eb',
  secondary: '#f59e42',
  background: '#f1f5f9',
  text: '#111827',
  borderRadius: 12,
  font: 'Inter',
  darkMode: false,
};

export default function ThemeCustomizer({ theme, setTheme, onClose }) {
  const [localTheme, setLocalTheme] = useState(theme || DEFAULT_THEME);

  useEffect(() => {
    setLocalTheme(theme || DEFAULT_THEME);
  }, [theme]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setLocalTheme(t => ({
      ...t,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSave() {
    setTheme(localTheme);
    localStorage.setItem('vontres_theme', JSON.stringify(localTheme));
    onClose();
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full max-w-md relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
          onClick={onClose}
          aria-label="Close Theme Customizer"
        >&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-200">Theme Customizer</h2>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Primary Color</label>
          <input type="color" name="primary" value={localTheme.primary} onChange={handleChange} className="w-12 h-8 p-0 border-0" />
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Secondary Color</label>
          <input type="color" name="secondary" value={localTheme.secondary} onChange={handleChange} className="w-12 h-8 p-0 border-0" />
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Background</label>
          <input type="color" name="background" value={localTheme.background} onChange={handleChange} className="w-12 h-8 p-0 border-0" />
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Text Color</label>
          <input type="color" name="text" value={localTheme.text} onChange={handleChange} className="w-12 h-8 p-0 border-0" />
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Font</label>
          <select name="font" value={localTheme.font} onChange={handleChange} className="w-full rounded border px-2 py-1">
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Georgia">Georgia</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Border Radius</label>
          <input type="range" name="borderRadius" min="0" max="32" value={localTheme.borderRadius} onChange={handleChange} />
          <span className="ml-2">{localTheme.borderRadius}px</span>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <input type="checkbox" name="darkMode" checked={localTheme.darkMode} onChange={handleChange} id="darkModeToggle" />
          <label htmlFor="darkModeToggle" className="font-semibold">Dark Mode</label>
        </div>
        <button className="w-full py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition mb-2" onClick={handleSave}>Save Theme</button>
      </div>
    </div>
  );
}
