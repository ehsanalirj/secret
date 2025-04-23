import React from 'react';

export default function UserManager() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">User & Role Management</h2>
      <p className="text-blue-800 mb-4">Manage users, roles, and permissions for your project. (Role-based access, invitations, and audit logs coming soon.)</p>
      <div className="bg-white rounded-xl shadow p-6">No users yet. Invite your team!</div>
    </div>
  );
}
