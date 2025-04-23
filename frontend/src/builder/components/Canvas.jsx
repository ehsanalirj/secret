import React from 'react';

export default function Canvas({ children }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center border-4 border-dashed border-blue-200 rounded-2xl bg-white/60 min-h-[500px]">
      {children ? children : <><span className="text-3xl text-blue-300 mb-2">Drag blocks/components here</span><span className="text-blue-400">(Visual editor, real-time collab, and more coming next)</span></>}
    </div>
  );
}
