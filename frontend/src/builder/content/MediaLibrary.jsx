import React, { useRef, useState, useEffect } from 'react';

function ImagePreviewModal({ open, src, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-4 max-w-2xl max-h-[90vh] flex flex-col items-center">
        <img src={src} alt="Preview" className="max-w-full max-h-[70vh] rounded mb-4" />
        <button className="px-4 py-1 rounded bg-blue-600 text-white font-bold" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default function MediaLibrary() {
  const [images, setImages] = useState(() => {
    const saved = window.localStorage.getItem('vontres_media');
    return saved ? JSON.parse(saved) : [];
  });
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const fileInput = useRef();

  useEffect(() => {
    window.localStorage.setItem('vontres_media', JSON.stringify(images));
  }, [images]);

  function handleMultiDelete() {
    setImages(imgs => imgs.filter((_, i) => !selected.includes(i)));
    setSelected([]);
  }

  function handleRename(idx, newName) {
    setImages(imgs => imgs.map((img, i) => i === idx ? { ...img, name: newName } : img));
  }

  function sortedImages() {
    if (sortBy === 'name') {
      return [...images].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    return [...images].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function handleFiles(files) {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => {
        setImages(imgs => [...imgs, { url: e.target.result, name: file.name, date: new Date().toISOString() }]);
      };
      reader.readAsDataURL(file);
    });
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  }

  function handleDelete(idx) {
    setImages(imgs => imgs.filter((_, i) => i !== idx));
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Media Library</h2>
      <div className="flex gap-2 mb-4">
        <button
          className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          onClick={() => {
            const blob = new Blob([JSON.stringify(images, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'media-library.json';
            a.click();
            URL.revokeObjectURL(url);
          }}
          title="Export all images as JSON"
        >Export</button>
        <label className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition cursor-pointer" title="Import images from JSON">
          Import
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={e => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = evt => {
                try {
                  const imported = JSON.parse(evt.target.result);
                  if (Array.isArray(imported)) {
                    setImages(imgs => [...imgs, ...imported.filter(img => img && img.url)]);
                  } else {
                    alert('Invalid media file.');
                  }
                } catch {
                  alert('Invalid JSON file.');
                }
              };
              reader.readAsText(file);
              e.target.value = '';
            }}
          />
        </label>
        <button
          className="px-4 py-2 rounded bg-gray-700 text-white font-semibold hover:bg-gray-800 transition"
          onClick={() => setSortBy(sortBy === 'date' ? 'name' : 'date')}
          title="Sort images by name/date"
        >Sort: {sortBy === 'date' ? 'Date' : 'Name'}</button>

      </div>
      <div className="flex gap-2 mb-4">
        <Tooltip text="Upload images (PNG, JPG, GIF)">
          <input
            type="file"
            accept="image/*"
            multiple
            aria-label="Upload images"
            onChange={e => handleFiles(e.target.files)}
          />
        </Tooltip>
        <Tooltip text="Generate an image with AI">
          <button
            className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            aria-label="Generate image with AI"
            onClick={() => setAIGeneratedImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAADyQe6rAAAAA1BMVEUAAACnej3aAAAASElEQVR4nO3BMQEAAAgDoJvc6F8MhwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwG8Bz2AAAX3eL1EAAAAASUVORK5CYII=')}
          >
            🤖 Generate Image
          </button>
        </Tooltip>
        {aiGeneratedImage && (
          <span className="ml-2 flex items-center gap-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
            <img src={aiGeneratedImage} alt="AI" className="w-8 h-8 rounded border" />
            <Tooltip text="Add this AI-generated image to your media library">
          <button
            className="underline text-blue-700"
            aria-label="Add AI image to library"
            onClick={() => addImageFromAI(aiGeneratedImage)}
          >Add</button>
        </Tooltip>
            <button
              className="ml-1 text-red-500 hover:text-red-700"
              onClick={() => setAIGeneratedImage('')}
              title="Dismiss"
            >×</button>
          </span>
        )}
      </div>
      <div className="mt-8 flex flex-col items-center">
      <span className="text-4xl mb-2">📁</span>
      <span className="mb-1 text-blue-700 font-semibold">Drag & drop images here, or click to upload</span>
      <span className="text-xs text-gray-500">PNG, JPG, GIF, up to 5MB each</span>
      {images.length === 0 ? (
        <div className="text-gray-500">No images yet. Upload your first image!</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sortedImages().map((img, idx) => (
            <div key={idx} className={`relative group border rounded-md overflow-hidden bg-white shadow hover:shadow-lg transition ${selected.includes(idx) ? 'ring-2 ring-blue-600' : ''}`}
              onClick={e => {
                if (e.ctrlKey || e.metaKey) {
                  setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
                } else {
                  setPreview(img.url);
                }
              }}
            >
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-32 object-cover cursor-pointer"
                loading="lazy"
              />
              <button
                className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                aria-label="Delete image"
                onClick={e => { e.stopPropagation(); handleDelete(idx); }}
              >Delete</button>
              <input
                className="absolute bottom-0 left-0 bg-black bg-opacity-40 text-white text-xs px-2 py-1 w-full truncate outline-none"
                value={img.name}
                onChange={e => handleRename(idx, e.target.value)}
                title="Rename image"
              />
              <input
                type="checkbox"
                className="absolute top-2 left-2"
                checked={selected.includes(idx)}
                onChange={e => {
                  e.stopPropagation();
                  setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
                }}
                title="Select for multi-delete"
              />
            </div>
          ))}
        </div>
      )}
      {preview && (
        <ImagePreviewModal open={!!preview} src={preview} onClose={() => setPreview(null)} />
      )}
      {selected.length > 0 && (
        <button
          className="fixed bottom-8 right-8 px-6 py-3 rounded-full bg-red-600 text-white font-bold shadow-xl hover:bg-red-700 z-50"
          onClick={handleMultiDelete}
          >Delete Selected ({selected.length})</button>
        )}
      </div>
    </div>
    );
  }