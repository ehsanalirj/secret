import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

export default function BrandingConfig() {
  const { user } = useUser();
  const [branding, setBranding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBranding() {
      setLoading(true);
      try {
        const res = await fetch(`/api/branding?tenant=${user?.tenant}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch branding');
        const data = await res.json();
        setBranding(data);
      } catch (e) {
        setBranding(null);
      }
      setLoading(false);
    }
    if (user?.tenant) fetchBranding();
  }, [user]);

  if (!user) return null;
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded shadow p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Branding Configuration</h2>
      {loading ? <div>Loading...</div> : !branding ? <div>No branding found.</div> : (
        <div>
          <div className="mb-2"><img src={branding.logoUrl} alt="Logo" className="h-12" /></div>
          <div className="mb-2">Theme: {JSON.stringify(branding.theme)}</div>
          <div className="mb-2">Custom Domain: {branding.customDomain}</div>
        </div>
      )}
    </div>
  );
}
