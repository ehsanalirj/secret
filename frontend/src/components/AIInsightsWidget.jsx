import React, { useEffect, useState } from 'react';

export default function AIInsightsWidget() {
  const [insights, setInsights] = useState([]);
  useEffect(() => {
    // Simulate fetching AI insights from backend
    setTimeout(() => {
      setInsights([
        { id: 1, message: 'Sales spike detected on weekends. Consider special offers.' },
        { id: 2, message: 'Vegan Burger is trending. Promote on homepage.' },
        { id: 3, message: 'Employee satisfaction is high this month.' },
      ]);
    }, 700);
  }, []);
  return (
    <div className="bg-white rounded shadow p-4 max-w-xs w-full">
      <h4 className="font-bold mb-2">AI Insights</h4>
      <ul className="list-disc ml-5 text-sm text-blue-900">
        {insights.map(i => (
          <li key={i.id}>{i.message}</li>
        ))}
      </ul>
    </div>
  );
}
