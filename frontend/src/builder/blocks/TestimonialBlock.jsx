import React from 'react';

export default function TestimonialBlock({ data, onEdit }) {
  return (
    <section className="py-8 px-4 text-center" style={{ background: 'var(--primary)', color: 'var(--background)', borderRadius: 'var(--radius)' }}>
      <blockquote className="text-lg italic mb-2">“{data?.quote || 'This is a great product!'}”</blockquote>
      <div className="text-blue-700 font-bold">{data?.author || 'Jane Doe'}</div>
      {onEdit && (
        <button onClick={onEdit} className="mt-2 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded">Edit</button>
      )}
    </section>
  );
}
