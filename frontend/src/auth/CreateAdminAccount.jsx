import React, { useState } from 'react';
import { createSuperAdmin } from './SuperAdminCreator';

export default function CreateAdminAccount() {
  const [email, setEmail] = useState('admin@vontres.com');
  const [password, setPassword] = useState('Vontres!SuperAdmin2025');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await createSuperAdmin(email, password);
      setResult(user);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleCreate} className="max-w-md mx-auto p-6 bg-white shadow rounded mt-12">
      <h2 className="text-2xl font-bold mb-4">Create Super Admin</h2>
      <label className="block mb-2 font-semibold">Email</label>
      <input className="border px-2 py-1 rounded w-full mb-4" value={email} onChange={e => setEmail(e.target.value)} required />
      <label className="block mb-2 font-semibold">Password</label>
      <input className="border px-2 py-1 rounded w-full mb-4" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button className="bg-blue-700 text-white px-4 py-2 rounded font-bold" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Super Admin'}</button>
      {result && <div className="mt-4 text-green-700">Super Admin created! Check your email to verify.</div>}
      {error && <div className="mt-4 text-red-600">Error: {error}</div>}
    </form>
  );
}
