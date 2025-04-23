import React, { useState } from 'react';
import { useToast } from '../components/ToastProvider';

const DEMO_CLIENTS = [
  { id: 1, name: 'Acme Corp', sites: 3, billing: 'Active', email: 'admin@acme.com', role: 'Owner' },
  { id: 2, name: 'Beta Agency', sites: 1, billing: 'Trial', email: 'hello@beta.com', role: 'Editor' },
  { id: 3, name: 'Gamma LLC', sites: 2, billing: 'Active', email: 'contact@gamma.com', role: 'Viewer' },
];

const ROLES = ['Owner', 'Editor', 'Viewer'];

export default function ClientPortalPanel() {
  const [clients, setClients] = useState(DEMO_CLIENTS);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', role: ROLES[2] });
  const toast = useToast();

  function validateEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }

  function handleAddClient(e) {
    e.preventDefault();
    if (!newClient.name || !newClient.email) {
      toast.showToast({ type: 'error', message: 'Name and email are required.' });
      return;
    }
    if (!validateEmail(newClient.email)) {
      toast.showToast({ type: 'error', message: 'Invalid email address.' });
      return;
    }
    setClients(clients => [
      ...clients,
      { id: Date.now(), name: newClient.name, sites: 0, billing: 'Trial', email: newClient.email, role: newClient.role }
    ]);
    setShowAdd(false);
    setNewClient({ name: '', email: '', role: ROLES[2] });
    toast.showToast({ type: 'success', message: `Invitation sent to ${newClient.email}` });
  }

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-900 flex items-center gap-2">👥 Client Portal</h2>
      <div className="mb-4 flex gap-2 items-center">
        <input className="border rounded px-2 py-1" placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)} />
        <button className="px-3 py-1 rounded bg-blue-100 text-blue-900 font-bold hover:bg-blue-200" onClick={() => setShowAdd(true)}>+ Invite Client</button>
      </div>
      {showAdd && (
        <form className="mb-4 flex gap-2 items-center" onSubmit={handleAddClient}>
          <input className="border rounded px-2 py-1" placeholder="Client Name" value={newClient.name} onChange={e => setNewClient(c => ({ ...c, name: e.target.value }))} />
          <input className="border rounded px-2 py-1" placeholder="Email" value={newClient.email} onChange={e => setNewClient(c => ({ ...c, email: e.target.value }))} />
          <select className="border rounded px-2 py-1" value={newClient.role} onChange={e => setNewClient(c => ({ ...c, role: e.target.value }))}>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button className="px-3 py-1 rounded bg-blue-700 text-white font-bold hover:bg-blue-900" type="submit">Invite</button>
          <button className="px-2 py-1 rounded bg-gray-200 text-gray-800 font-bold" type="button" onClick={() => setShowAdd(false)}>Cancel</button>
        </form>
      )}
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-2 py-1 border">Name</th>
            <th className="px-2 py-1 border">Sites</th>
            <th className="px-2 py-1 border">Billing</th>
            <th className="px-2 py-1 border">Email</th>
            <th className="px-2 py-1 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(client => (
            <tr key={client.id}>
              <td className="px-2 py-1 border font-semibold text-blue-900">{client.name}</td>
              <td className="px-2 py-1 border text-center">{client.sites}</td>
              <td className="px-2 py-1 border text-center">{client.billing}</td>
              <td className="px-2 py-1 border">{client.email}</td>
              <td className="px-2 py-1 border text-center">{client.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
