import React, { useState } from 'react';

export default function MailchimpSignupBlock({ apiKey, audience }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setError('');
    setSubmitted(true);
    // Real integration: POST to Mailchimp API
  }

  return (
    <div className="border rounded-xl p-6 bg-white shadow w-full max-w-md mx-auto">
      <div className="text-2xl font-bold text-blue-900 mb-2">Mailchimp Signup</div>
      <div className="mb-2 text-gray-700 text-xs">Audience: {audience || 'Demo Audience'} (Demo)</div>
      {submitted ? (
        <div className="text-green-700 font-bold text-lg">Thank you for subscribing!</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            className="border rounded px-2 py-1"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {error && <div className="text-red-600 text-xs">{error}</div>}
          <button className="px-4 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-900" type="submit">
            Subscribe
          </button>
        </form>
      )}
      <div className="mt-4 text-xs text-gray-400">(Demo only, not real subscription)</div>
    </div>
  );
}
