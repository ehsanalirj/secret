import React, { useState } from 'react';

const STEPS = [
  {
    title: 'Welcome to VONTRES!',
    body: 'This builder lets you create stunning websites with real-time collaboration, AI-powered tools, and full customization.'
  },
  {
    title: 'Live Collaboration',
    body: 'See who is editing with avatars, and work together in real time.'
  },
  {
    title: 'AI Assistant',
    body: 'Use the AI Assistant for copywriting, SEO, color palettes, and onboarding help.'
  },
  {
    title: 'Theme Customizer',
    body: 'Click the 🎨 Theme button to personalize your site with custom colors, fonts, and dark mode.'
  },
  {
    title: 'Accessibility',
    body: 'Toggle high-contrast mode and enjoy full keyboard navigation for all features.'
  },
  {
    title: 'Get Started!',
    body: 'Add blocks, edit content, and publish your site. Use tooltips (❓) for help anywhere.'
  }
];

export default function OnboardingModal({ onClose }) {
  const [step, setStep] = useState(0);

  function next() {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else onClose();
  }
  function prev() {
    if (step > 0) setStep(s => s - 1);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full max-w-md relative animate-slide-up" role="dialog" aria-modal="true" aria-label="Onboarding" aria-live="polite" tabIndex={-1}>
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
          onClick={onClose}
          aria-label="Close Onboarding"
        >&times;</button>
        <h2 className="text-xl font-bold mb-2 text-blue-900 dark:text-blue-200">{STEPS[step].title}</h2>
        <p className="mb-6 text-blue-800 dark:text-blue-100">{STEPS[step].body}</p>
        <div className="flex justify-between items-center">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
            onClick={prev}
            disabled={step === 0}
          >Back</button>
          <div className="flex gap-1">
            {STEPS.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-blue-600' : 'bg-gray-300'} inline-block`} />
            ))}
          </div>
          <button
            className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 font-semibold"
            onClick={next}
            aria-label={step === STEPS.length - 1 ? 'Finish' : 'Next'}
          >{step === STEPS.length - 1 ? 'Finish' : 'Next'}</button>
        </div>
      </div>
    </div>
  );
}
