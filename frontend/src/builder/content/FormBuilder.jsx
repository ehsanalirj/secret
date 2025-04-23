import React, { useState, useEffect } from 'react';

const FIELD_TYPES = [
  { type: 'text', label: 'Text' },
  { type: 'email', label: 'Email' },
  { type: 'textarea', label: 'Textarea' },
  { type: 'select', label: 'Select' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'radio', label: 'Radio' },
];

function FieldEditor({ field, onChange, onDelete }) {
  return (
    <div className="flex gap-2 items-center mb-2">
      <select
        className="border rounded px-2 py-1"
        value={field.type}
        onChange={e => onChange({ ...field, type: e.target.value })}
      >
        {FIELD_TYPES.map(ft => <option key={ft.type} value={ft.type}>{ft.label}</option>)}
      </select>
      <input
        className="border rounded px-2 py-1 flex-1"
        placeholder="Field label"
        value={field.label}
        onChange={e => onChange({ ...field, label: e.target.value })}
      />
      {(field.type === 'select' || field.type === 'radio') && (
        <input
          className="border rounded px-2 py-1"
          placeholder="Options (comma separated)"
          value={field.options || ''}
          onChange={e => onChange({ ...field, options: e.target.value })}
        />
      )}
      <button className="text-red-600 hover:underline ml-1" onClick={onDelete} aria-label="Delete field">Delete</button>
    </div>
  );
}

function FormPreview({ fields, onSubmit }) {
  return (
    <form className="bg-gray-50 border rounded p-4 mt-4" onSubmit={onSubmit}>
      {fields.map((f, idx) => {
        switch (f.type) {
          case 'text':
            return <div key={idx} className="mb-3"><label className="block font-semibold mb-1">{f.label}<input className="border rounded px-2 py-1 w-full" type="text" /></label></div>;
          case 'email':
            return <div key={idx} className="mb-3"><label className="block font-semibold mb-1">{f.label}<input className="border rounded px-2 py-1 w-full" type="email" /></label></div>;
          case 'textarea':
            return <div key={idx} className="mb-3"><label className="block font-semibold mb-1">{f.label}<textarea className="border rounded px-2 py-1 w-full" rows={3} /></label></div>;
          case 'select':
            return <div key={idx} className="mb-3"><label className="block font-semibold mb-1">{f.label}<select className="border rounded px-2 py-1 w-full">{(f.options || '').split(',').map(opt => <option key={opt}>{opt}</option>)}</select></label></div>;
          case 'checkbox':
            return <div key={idx} className="mb-3 flex items-center gap-2"><input type="checkbox" className="accent-blue-600" id={`f${idx}`} /><label htmlFor={`f${idx}`}>{f.label}</label></div>;
          case 'radio':
            return <div key={idx} className="mb-3"><div className="font-semibold mb-1">{f.label}</div>{(f.options || '').split(',').map(opt => <label key={opt} className="mr-4"><input type="radio" name={`r${idx}`} className="accent-blue-600" /> {opt}</label>)}</div>;
          default:
            return null;
        }
      })}
      <button type="submit" className="mt-2 px-4 py-1 rounded bg-blue-600 text-white font-bold">Submit</button>
    </form>
  );
}

export default function FormBuilder() {
  const [fields, setFields] = useState(() => {
    const saved = window.localStorage.getItem('vontres_form');
    return saved ? JSON.parse(saved) : [];
  });
  const [submissions, setSubmissions] = useState(() => {
    const saved = window.localStorage.getItem('vontres_form_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    window.localStorage.setItem('vontres_form', JSON.stringify(fields));
  }, [fields]);
  useEffect(() => {
    window.localStorage.setItem('vontres_form_submissions', JSON.stringify(submissions));
  }, [submissions]);

  function addField() {
    setFields(f => [...f, { type: 'text', label: 'Untitled' }]);
  }
  function updateField(idx, field) {
    setFields(f => f.map((fld, i) => i === idx ? field : fld));
  }
  function deleteField(idx) {
    setFields(f => f.filter((_, i) => i !== idx));
  }
  function moveField(idx, dir) {
    if ((dir === -1 && idx === 0) || (dir === 1 && idx === fields.length - 1)) return;
    const newFields = [...fields];
    const [removed] = newFields.splice(idx, 1);
    newFields.splice(idx + dir, 0, removed);
    setFields(newFields);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const data = {};
    Array.from(e.target.elements).forEach(el => {
      if (el.name && el.value !== undefined) data[el.name] = el.value;
    });
    setSubmissions(subs => [...subs, { ...data, date: new Date().toISOString() }]);
    alert('Form submitted! (Saved locally)');
    e.target.reset();
  }

  function exportFields() {
    const blob = new Blob([JSON.stringify(fields, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-fields.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  function importFields(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (Array.isArray(imported)) {
          setFields(f => [...f, ...imported.filter(x => x && x.label)]);
        } else {
          alert('Invalid form fields file.');
        }
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }
  function exportSubmissions() {
    const blob = new Blob([JSON.stringify(submissions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-submissions.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Form Builder</h2>
      <div className="flex gap-2 mb-4">
        <Tooltip text="Add a new field to the form">
          <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" aria-label="Add field" onClick={addField}>Add Field</button>
        </Tooltip>
        <Tooltip text="Export form fields as JSON">
          <button className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition" aria-label="Export fields" onClick={exportFields}>Export Fields</button>
        </Tooltip>
        <label className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition cursor-pointer" title="Import form fields from JSON">
          Import Fields
          <input type="file" accept="application/json" className="hidden" onChange={importFields} />
        </label>
        <Tooltip text="Export all form submissions as JSON">
          <button className="px-4 py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition" aria-label="Export submissions" onClick={exportSubmissions}>Export Submissions</button>
        </Tooltip>
      </div>
      <div className="mb-4">
        {fields.length === 0 && <div className="text-gray-500">No fields yet. Click "+ Add Field" to start.</div>}
        {fields.map((field, idx) => (
          <div key={idx} className="flex items-center gap-1 mb-1">
            <FieldEditor
              field={field}
              onChange={f => updateField(idx, f)}
              onDelete={() => deleteField(idx)}
            />
            <button className="text-xs px-2 py-1 rounded bg-gray-200 ml-1" onClick={() => moveField(idx, -1)} disabled={idx === 0}>↑</button>
            <button className="text-xs px-2 py-1 rounded bg-gray-200" onClick={() => moveField(idx, 1)} disabled={idx === fields.length - 1}>↓</button>
          </div>
        ))}
      </div>
      <div className="font-semibold mb-2">Live Preview</div>
      <FormPreview fields={fields} onSubmit={handleFormSubmit} />
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Submissions</h3>
        {submissions.length === 0 ? (
          <div className="text-gray-500">No submissions yet.</div>
        ) : (
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {submissions.map((s, idx) => (
              <li key={idx} className="border rounded px-3 py-2 bg-white text-sm">
                <div className="text-xs text-gray-400 mb-1">{new Date(s.date).toLocaleString()}</div>
                {Object.keys(s).filter(k => k !== 'date').map(k => (
                  <div key={k}><span className="font-semibold mr-1">{k}:</span>{s[k]}</div>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
