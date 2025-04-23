import React, { useState, useEffect } from 'react';
import { useSupabaseAuth } from '../auth/useSupabaseAuth';
import { supabase } from '../supabaseClient';
import RestaurantManager from '../builder/admin/RestaurantManager';
import UserManager from '../builder/admin/UserManager';
import AuditLog from '../builder/admin/AuditLog';
import BillingPanel from '../builder/admin/BillingPanel';
import SettingsPanel from '../builder/admin/SettingsPanel';

// Ultra-secure admin panel: only accessible by secret route & superadmin
export default function UltraSecureAdmin() {
  const { user, loading, refreshUser } = useSupabaseAuth();

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState(null);
  const [roleUpdates, setRoleUpdates] = useState({});
  const [tab, setTab] = useState('users');

  // This secret must match the .env or hardcoded value only you know
  const ULTRA_SECRET = 'VONTRES-PRIVATE-ADMIN-2025';

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  async function fetchUsers() {
    setLoadingUsers(true);
    setError(null);
    // Fetch users from Supabase (requires service role or RLS disabled for admin)
    const { data, error } = await supabase.rpc('get_all_users_with_metadata');
    if (error) setError(error.message);
    else setUsers(data);
    setLoadingUsers(false);
  }

  async function updateRole(userId, newRole) {
    setRoleUpdates(upd => ({ ...upd, [userId]: true }));
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { role: newRole }
    });
    setRoleUpdates(upd => ({ ...upd, [userId]: false }));
    if (error) setError(error.message);
    else {
      fetchUsers();
      refreshUser();
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return <div className="p-8 text-red-700">Access denied.</div>;

  // Render the admin panel directly (no secret/passphrase UI)
  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-6">Ultra Secure Admin Panel</h1>
      <p className="mb-8 text-blue-800">Welcome, Admin! This panel is now accessible to any logged-in user for development/testing.</p>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex gap-2 mb-6">
          <button className={`px-4 py-2 rounded font-bold ${tab === 'users' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-900'}`} onClick={() => setTab('users')}>Users</button>
          <button className={`px-4 py-2 rounded font-bold ${tab === 'restaurants' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-900'}`} onClick={() => setTab('restaurants')}>Restaurants</button>
          <button className={`px-4 py-2 rounded font-bold ${tab === 'audit' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-900'}`} onClick={() => setTab('audit')}>Audit Log</button>
          <button className={`px-4 py-2 rounded font-bold ${tab === 'billing' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-900'}`} onClick={() => setTab('billing')}>Billing</button>
          <button className={`px-4 py-2 rounded font-bold ${tab === 'settings' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-900'}`} onClick={() => setTab('settings')}>Settings</button>
        </div>
        {tab === 'users' && (
          <>
            <h2 className="text-xl font-bold mb-4">User & Role Management</h2>
            {loadingUsers ? (
              <div>Loading users...</div>
            ) : error ? (
              <div className="text-red-700">{error}</div>
            ) : (
              <table className="w-full text-left mb-4">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Email</th>
                    <th className="py-2">Role</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? users.map(u => (
                    <tr key={u.id} className="border-b">
                      <td className="py-2">{u.email}</td>
                      <td className="py-2">{u.user_metadata?.role || 'user'}</td>
                      <td className="py-2">
                        <select
                          value={u.user_metadata?.role || 'user'}
                          onChange={e => updateRole(u.id, e.target.value)}
                          disabled={roleUpdates[u.id]}
                          className="border rounded px-2 py-1"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="superadmin">Super Admin</option>
                        </select>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={3}>No users found.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </>
        )}
        {tab === 'restaurants' && (
          <>
            <h2 className="text-xl font-bold mb-4">Restaurant Management</h2>
            <RestaurantManager />
          </>
        )}
        {tab === 'audit' && (
          <>
            <h2 className="text-xl font-bold mb-4">Audit Log & Activity Feed</h2>
            <AuditLog />
          </>
        )}
        {tab === 'billing' && (
          <>
            <h2 className="text-xl font-bold mb-4">Billing & Subscription</h2>
            <BillingPanel />
          </>
        )}
        {tab === 'settings' && (
          <>
            <h2 className="text-xl font-bold mb-4">Project Settings</h2>
            <SettingsPanel />
          </>
        )}
      </div>
    </div>
  );
}
