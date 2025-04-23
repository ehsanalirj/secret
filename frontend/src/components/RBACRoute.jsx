import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export default function RBACRoute({ roles, children }) {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" />;
  if (!roles.some(role => user.roles.includes(role))) {
    return <div className="p-8 text-red-700">Access Denied: Insufficient permissions.</div>;
  }
  return children;
}
