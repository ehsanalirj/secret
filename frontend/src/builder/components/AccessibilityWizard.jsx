import React, { useState } from 'react';
import Tooltip from './Tooltip';

const DEMO_ISSUES = [
  { id: 1, type: 'contrast', message: 'Low color contrast in header', fix: 'Increase text or background contrast.' },
  { id: 2, type: 'alt', message: 'Missing alt text on image', fix: 'Add alt text to all images.' },
  { id: 3, type: 'aria', message: 'Missing ARIA label on button', fix: 'Add aria-label to all interactive elements.' },
];

export default function AccessibilityWizard({ issues = DEMO_ISSUES, onFix }) {
  const [fixed, setFixed] = useState([]);

  function handleFix(id) {
    setFixed(f => [...f, id]);
    if (onFix) onFix(id);
  }

  return (
    <div className="fixed bottom-6 right-6 bg-white border border-green-300 rounded-xl shadow-lg p-4 w-80 z-50 animate-fadeIn">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">♿</span>
        <span className="font-bold text-lg text-green-900">Accessibility Wizard</span>
      </div>
      <ul className="space-y-2">
        {issues.map(issue => (
          <li key={issue.id} className={`p-2 rounded flex items-start gap-2 ${fixed.includes(issue.id) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-800'}`}>
            <span className="text-xl" aria-label={issue.type}>{issue.type === 'contrast' ? '🌈' : issue.type === 'alt' ? '🖼️' : '🔖'}</span>
            <div className="flex-1">
              <div className="font-semibold">{issue.message}</div>
              <div className="text-xs">{issue.fix}</div>
            </div>
            {!fixed.includes(issue.id) && (
              <Tooltip text="Auto-fix">
                <button className="ml-2 px-2 py-1 bg-green-600 text-white rounded text-xs font-bold" onClick={() => handleFix(issue.id)} aria-label="Auto-fix">Fix</button>
              </Tooltip>
            )}
            {fixed.includes(issue.id) && <span className="text-green-600 font-bold">Fixed</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
