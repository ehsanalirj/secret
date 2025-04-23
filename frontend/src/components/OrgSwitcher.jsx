import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

export default function OrgSwitcher() {
  const { user, setUser } = useUser();
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrgs() {
      setLoading(true);
      try {
        const res = await fetch('/api/organization', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch organizations');
        const data = await res.json();
        setOrgs(data);
      } catch (e) {
        setOrgs([]);
      }
      setLoading(false);
    }
    if (user) fetchOrgs();
  }, [user]);

  function switchOrg(orgId) {
    // In real app, update user context and reload data
    setUser({ ...user, orgId });
  }

  if (!user) return null;
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded shadow p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Organization Switcher</h2>
      {loading ? <div>Loading...</div> : orgs.length === 0 ? <div>No organizations found.</div> : (
        <select value={user.orgId || ''} onChange={e => switchOrg(e.target.value)} className="border rounded p-1">
          <option value="">Select organization...</option>
          {orgs.map(o => (
            <option key={o._id} value={o._id}>{o.name}</option>
          ))}
        </select>
      )}
    </div>
  );
}
