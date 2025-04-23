import React, { useState } from 'react';

const DEFAULTS = {
  primary: '#2563eb',
  secondary: '#64748b',
  background: '#f1f5f9',
  text: '#0f172a',
  font: 'Inter',
  radius: 16,
};

export default function DesignSystemPanel({ settings, onChange }) {
  const [form, setForm] = useState(settings || DEFAULTS);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    onChange({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-md mx-auto mt-8">
      <h3 className="text-xl font-bold text-blue-900 mb-4">Design System</h3>
      <div className="mb-3">
        <label className="block text-blue-900 mb-1">Primary Color</label>
        <input type="color" name="primary" value={form.primary} onChange={handleChange} className="w-12 h-8 p-0 border-none bg-transparent" />
        <input type="text" name="primary" value={form.primary} onChange={handleChange} className="ml-2 border px-2 py-1 rounded" />
      </div>
      <div className="mb-3">
        <label className="block text-blue-900 mb-1">Secondary Color</label>
        <input type="color" name="secondary" value={form.secondary} onChange={handleChange} className="w-12 h-8 p-0 border-none bg-transparent" />
        <input type="text" name="secondary" value={form.secondary} onChange={handleChange} className="ml-2 border px-2 py-1 rounded" />
      </div>
      <div className="mb-3">
        <label className="block text-blue-900 mb-1">Background</label>
        <input type="color" name="background" value={form.background} onChange={handleChange} className="w-12 h-8 p-0 border-none bg-transparent" />
        <input type="text" name="background" value={form.background} onChange={handleChange} className="ml-2 border px-2 py-1 rounded" />
      </div>
      <div className="mb-3">
        <label className="block text-blue-900 mb-1">Text Color</label>
        <input type="color" name="text" value={form.text} onChange={handleChange} className="w-12 h-8 p-0 border-none bg-transparent" />
        <input type="text" name="text" value={form.text} onChange={handleChange} className="ml-2 border px-2 py-1 rounded" />
      </div>
      <div className="mb-3">
        <label className="block text-blue-900 mb-1">Font Family</label>
        <input type="text" name="font" value={form.font} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
      </div>
      <div className="mb-3">
        <label className="block text-blue-900 mb-1">Border Radius (px)</label>
        <input type="number" name="radius" value={form.radius} onChange={handleChange} className="border px-2 py-1 rounded w-24" min={0} max={64} />
      </div>
    </div>
  );
}
