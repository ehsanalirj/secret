import React, { useEffect, useState } from 'react';

// Demo: fake real-time stats
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export default function RealtimeAnalyticsBanner() {
  const [online, setOnline] = useState(getRandomInt(8, 20));
  const [installs, setInstalls] = useState(getRandomInt(150, 200));
  useEffect(() => {
    const interval = setInterval(() => {
      setOnline(getRandomInt(8, 20));
      setInstalls(i => i + getRandomInt(0, 2));
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mb-4 p-3 rounded bg-gradient-to-r from-blue-100 to-green-100 flex gap-4 items-center justify-center font-bold text-blue-900 text-sm shadow">
      <span>🟢 {online} users online now</span>
      <span>⬇️ {installs} installs today</span>
      <span>⚡ Real-time analytics updating live</span>
    </div>
  );
}
