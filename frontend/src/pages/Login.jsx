import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adminCreds, setAdminCreds] = useState(null);
  const [copyMsg, setCopyMsg] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      // Store user info and token for RBAC/navigation and API calls
      const user = data?.user || {};
      // Try to get token from Supabase session
      let token = null;
      if (data?.session?.access_token) {
        token = data.session.access_token;
      } else if (data?.access_token) {
        token = data.access_token;
      }
      // Fallback for local dev if no token
      if (!token) token = 'dummy-local-token';
      localStorage.setItem('accessToken', token);
      localStorage.setItem('token', token); // for legacy compatibility
      localStorage.setItem('currentUser', JSON.stringify({ email: user.email, role: user.user_metadata?.role || '' }));
      navigate('/olo');
    }
  }

  async function generateAdminCreds() {
    setLoading(true);
    setCopyMsg('');
    setError(null);
    // Generate a random secure password
    const randomPass = 'Vontres!' + Math.random().toString(36).slice(-8) + Math.floor(Math.random()*1000);
    const adminEmail = 'admin@vontres.com';
    try {
      // Try to create admin user (ignore error if already exists)
      const { error } = await supabase.auth.signUp({
        email: adminEmail,
        password: randomPass,
        options: { data: { role: 'superadmin' } }
      });
      setAdminCreds({ email: adminEmail, password: randomPass });
    } catch (err) {
      setError('Could not generate admin user.');
    }
    setLoading(false);
  }

  function copyCreds() {
    if (adminCreds) {
      navigator.clipboard.writeText(`Email: ${adminCreds.email}\nPassword: ${adminCreds.password}`);
      setCopyMsg('Copied to clipboard!');
      setTimeout(() => setCopyMsg(''), 2000);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <form onSubmit={handleLogin} className="bg-white rounded-xl shadow p-8 w-full max-w-sm" aria-label="Login form">
        <h1 className="text-2xl font-extrabold text-blue-900 mb-6">Sign In</h1>
        <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
        <input id="email" className="border px-2 py-1 rounded w-full mb-4" type="email" value={email} onChange={e => setEmail(e.target.value)} required aria-required="true" aria-label="Email address" />
        <label className="block mb-2 font-semibold" htmlFor="password">Password</label>
        <input id="password" className="border px-2 py-1 rounded w-full mb-4" type="password" value={password} onChange={e => setPassword(e.target.value)} required aria-required="true" aria-label="Password" />
        <button className="bg-blue-700 text-white px-4 py-2 rounded font-bold w-full focus:outline-none focus:ring-2 focus:ring-blue-600" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
        <button type="button" className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600" onClick={generateAdminCreds} disabled={loading} aria-label="Generate admin credentials">Generate Admin Credentials</button>
        {adminCreds && (
          <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
            <div className="font-semibold">Admin Credentials</div>
            <div className="text-xs">Email: <span className="font-mono select-all">{adminCreds.email}</span></div>
            <div className="text-xs">Password: <span className="font-mono select-all">{adminCreds.password}</span></div>
            <button type="button" className="mt-2 text-blue-700 underline" onClick={copyCreds} aria-label="Copy credentials to clipboard">Copy Credentials</button>
            {copyMsg && <span className="ml-2 text-green-700">{copyMsg}</span>}
          </div>
        )}
        {error && <div className="text-red-600 mt-2" role="alert">{error}</div>}
        <div className="flex flex-col gap-2 mt-8">
          <button type="button" className="underline text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600" onClick={() => navigate('/website-builder')}>Go to Website Builder</button>
          <button type="button" className="underline text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600" onClick={() => navigate('/private-vontres-ops-2025')}>Admin Login</button>
        </div>
      </form>
    </main>
  );
}
