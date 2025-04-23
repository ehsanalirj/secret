import React from 'react';

export default function GalleryBlock({ data, onEdit }) {
  return (
    <section className="py-8 px-4 shadow" style={{ background: 'var(--background)', color: 'var(--text)', borderRadius: 'var(--radius)' }}>
      <h3 className="text-xl font-bold text-blue-800 mb-4">{data?.title || 'Gallery'}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(data?.images || [
          'https://source.unsplash.com/random/200x200?sig=1',
          'https://source.unsplash.com/random/200x200?sig=2',
          'https://source.unsplash.com/random/200x200?sig=3',
          'https://source.unsplash.com/random/200x200?sig=4'
        ]).map((img, i) => (
          <img key={i} src={img} alt="Gallery" className="w-full h-32 object-cover" style={{ borderRadius: 'calc(var(--radius) / 2)' }} />
        ))}
      </div>
      {onEdit && (
        <button onClick={onEdit} className="mt-4 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded">Edit</button>
      )}
    </section>
  );
}
