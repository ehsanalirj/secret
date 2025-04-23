import React from 'react';

export default function FeatureBlock({ data, onEdit }) {
  return (
    <section className="py-10 px-4 shadow" style={{ background: 'var(--background)', color: 'var(--text)', borderRadius: 'var(--radius)' }}>
      <h3 className="text-2xl font-bold text-blue-800 mb-4">{data?.title || 'Features'}</h3>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(data?.features || [
          'Feature One',
          'Feature Two',
          'Feature Three'
        ]).map((f, i) => (
          <li key={i} className="p-4" style={{ background: 'var(--primary)', color: 'var(--background)', borderRadius: 'calc(var(--radius) / 2)' }}>{f}</li>
        ))}
      </ul>
      {onEdit && (
        <button onClick={onEdit} className="mt-4 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded">Edit</button>
      )}
    </section>
  );
}
