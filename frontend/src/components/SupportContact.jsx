import React, { useState } from 'react';

export default function SupportContact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Replace with real API endpoint
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message })
      });
      if (!res.ok) throw new Error('Failed to send message');
      setSent(true);
    } catch (e) {
      setError('Could not send message. Please try again later.');
    }
    setLoading(false);
  }

  if (sent) return <div className="p-4 bg-green-100 text-green-700 rounded">Support request sent! We will get back to you soon.</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-2">Support / Contact</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="w-full border rounded p-2 mb-2"
      />
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="How can we help you?"
        required
        className="w-full border rounded p-2 mb-2"
        rows={4}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
    </form>
  );
}
