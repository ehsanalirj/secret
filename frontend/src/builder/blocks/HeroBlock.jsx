import React from 'react';

export default function HeroBlock({ data, onEdit }) {
  return (
    <section className="py-12 px-4 text-center" style={{ background: 'var(--primary)', color: 'var(--text)', borderRadius: 'var(--radius)' }}>
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">{data?.headline || 'Your Headline Here'}</h2>
      <p className="text-xl text-blue-700 mb-6">{data?.subheadline || 'Your subheadline goes here.'}</p>
      <button className="px-6 py-2 rounded" style={{ background: 'var(--secondary)', color: 'var(--background)', fontWeight: 700 }}>{data?.cta || 'Get Started'}</button>
      {onEdit && (
        <button onClick={onEdit} className="ml-4 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded">Edit</button>
      )}
    </section>
  );
}
