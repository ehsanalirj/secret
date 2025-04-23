import React, { useState } from 'react';

export default function OnboardingModal({ onClose }) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: 'Welcome to Vontres!',
      content: 'Your all-in-one, secure, and unbeatable SaaS platform. Let’s get you started!'
    },
    {
      title: 'Navigation',
      content: 'Use the sidebar to access advanced modules: analytics, AI, integrations, webhooks, reports, and more.'
    },
    {
      title: 'Security',
      content: 'All actions are RBAC-protected, audited, and compliant. Your data is safe and monitored.'
    },
    {
      title: 'Support',
      content: 'Need help? Use the support module or contact your admin.'
    }
  ];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">{steps[step].title}</h2>
        <div className="mb-4">{steps[step].content}</div>
        <div className="flex justify-between">
          <button onClick={onClose} className="text-gray-500 hover:underline">Skip</button>
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(step + 1)} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
          ) : (
            <button onClick={onClose} className="bg-green-600 text-white px-4 py-2 rounded">Finish</button>
          )}
        </div>
      </div>
    </div>
  );
}
