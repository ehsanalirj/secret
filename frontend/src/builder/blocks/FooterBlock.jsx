import React from 'react';

export default function FooterBlock({ data, onEdit }) {
  return (
    <footer className="py-6 px-4 text-center mt-8" style={{ background: 'var(--secondary)', color: 'var(--background)', borderRadius: 'var(--radius)' }}>
      <div className="mb-2">{data?.copyright || '© 2025 VONTRES. All rights reserved.'}</div>
      {onEdit && (
        <button onClick={onEdit} className="mt-2 px-3 py-1 text-xs bg-blue-100 text-blue-900 rounded">Edit</button>
      )}
    </footer>
  );
}
