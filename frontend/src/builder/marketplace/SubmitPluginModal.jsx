import React, { useState } from 'react';

export default function SubmitPluginModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  function handleFile(e) {
    setFile(e.target.files[0]);
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !desc || !file) {
      setError('All fields are required.');
      return;
    }
    if (!file.name.endsWith('.js')) {
      setError('Only .js files are allowed.');
      return;
    }
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      onSubmit({ name, desc, file });
      setName(''); setDesc(''); setFile(null); setError('');
      onClose();
    }, 1200);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fadeIn">
      <form className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-slide-up relative" onSubmit={handleSubmit}>
        <button className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700" onClick={onClose} type="button" aria-label="Close">✕</button>
        <h3 className="text-xl font-bold mb-3 text-blue-900 flex items-center gap-2">🚀 Submit Plugin</h3>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Plugin Name</label>
          <input className="w-full border rounded px-2 py-1" value={name} onChange={e => setName(e.target.value)} placeholder="My Amazing Plugin" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <input className="w-full border rounded px-2 py-1" value={desc} onChange={e => setDesc(e.target.value)} placeholder="What does it do?" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Plugin File (.js)</label>
          <input type="file" accept=".js" onChange={handleFile} />
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button className="mt-2 px-4 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-900 w-full" type="submit" disabled={uploading}>{uploading ? 'Submitting...' : 'Submit Plugin'}</button>
      </form>
    </div>
  );
}
