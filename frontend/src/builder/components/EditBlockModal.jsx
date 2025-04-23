import React, { useState } from 'react';

export default function EditBlockModal({ block, data, onSave, onClose }) {
  const [form, setForm] = useState(data || {});

  // Simple dynamic form for demo purposes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  // Fields based on block type
  let fields = [];
  if (block.type === 'Hero') {
    fields = [
      { label: 'Headline', name: 'headline' },
      { label: 'Subheadline', name: 'subheadline' },
      { label: 'CTA', name: 'cta' }
    ];
  } else if (block.type === 'Feature') {
    fields = [
      { label: 'Title', name: 'title' },
      { label: 'Features (comma separated)', name: 'features' }
    ];
  } else if (block.type === 'Gallery') {
    fields = [
      { label: 'Title', name: 'title' },
      { label: 'Images (comma separated URLs)', name: 'images' }
    ];
  } else if (block.type === 'Testimonial') {
    fields = [
      { label: 'Quote', name: 'quote' },
      { label: 'Author', name: 'author' }
    ];
  } else if (block.type === 'Footer') {
    fields = [
      { label: 'Copyright', name: 'copyright' }
    ];
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <form className="bg-white rounded-xl p-6 shadow-lg min-w-[320px]" onSubmit={handleSubmit}>
        <h3 className="text-lg font-bold mb-4">Edit {block.name}</h3>
        {fields.map((f) => (
          <div className="mb-3" key={f.name}>
            <label className="block text-blue-900 font-medium mb-1">{f.label}</label>
            <input
              className="w-full border rounded px-3 py-2"
              name={f.name}
              value={form[f.name] || ''}
              onChange={handleChange}
              autoFocus={f.name === fields[0].name}
            />
          </div>
        ))}
        <div className="flex gap-2 mt-4 justify-end">
          <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-700" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  );
}
