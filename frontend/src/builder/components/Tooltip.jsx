import React from 'react';

export default function Tooltip({ text, children, position = 'top' }) {
  const [visible, setVisible] = React.useState(false);
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
      aria-label={text}
    >
      {children}
      {visible && (
        <span
          className={`absolute z-50 px-2 py-1 rounded bg-gray-900 text-white text-xs shadow transition-opacity duration-200 animate-fadeIn ${
            position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' :
            position === 'right' ? 'left-full top-1/2 -translate-y-1/2 ml-2' :
            position === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2' :
            'right-full top-1/2 -translate-y-1/2 mr-2'
          }`}
          role="tooltip"
        >
          {text}
        </span>
      )}
    </span>
  );
}
