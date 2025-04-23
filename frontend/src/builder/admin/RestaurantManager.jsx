import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function RestaurantManager() {
  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', address: '', assignedUserId: '' });
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    setError('');
    try {
      const { data: restData, error: restErr } = await supabase.from('restaurants').select('*');
      const { data: userData, error: userErr } = await supabase.from('users').select('id, email');
      if (restErr || userErr) throw new Error(restErr?.message || userErr?.message);
      setRestaurants(restData || []);
      setUsers(userData || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function startEdit(r) {
    setEditId(r.id);
    setForm({ name: r.name, address: r.address, assignedUserId: r.assignedUserId || '' });
  }

  function cancelEdit() {
    setEditId(null);
    setForm({ name: '', address: '', assignedUserId: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editId) {
        // Update
        const { error: updateErr } = await supabase.from('restaurants').update({
          name: form.name,
          address: form.address,
          assignedUserId: form.assignedUserId,
        }).eq('id', editId);
        if (updateErr) throw new Error(updateErr.message);
      } else {
        // Create
        const { error: insertErr } = await supabase.from('restaurants').insert([
          { name: form.name, address: form.address, assignedUserId: form.assignedUserId }
        ]);
        if (insertErr) throw new Error(insertErr.message);
      }
      cancelEdit();
      fetchData();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this restaurant?')) return;
    setSaving(true);
    setError('');
    try {
      const { error: delErr } = await supabase.from('restaurants').delete().eq('id', id);
      if (delErr) throw new Error(delErr.message);
      fetchData();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Restaurant Management</h2>
      <p className="text-blue-800 mb-4">Create, edit, assign users, and delete restaurants. All changes are logged for audit.</p>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-3 flex-wrap items-end">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Restaurant Name" className="border p-2 rounded w-48" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded w-64" required />
        <select name="assignedUserId" value={form.assignedUserId} onChange={handleChange} className="border p-2 rounded w-48">
          <option value="">Assign User</option>
          {users.map(u => <option value={u.id} key={u.id}>{u.email}</option>)}
        </select>
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded" disabled={saving}>
          {editId ? 'Update' : 'Add'}
        </button>
        {editId && <button type="button" className="ml-2 px-4 py-2 rounded bg-gray-200" onClick={cancelEdit}>Cancel</button>}
      </form>
      {loading ? <div>Loading...</div> : (
        <table className="w-full bg-white rounded-xl shadow mb-6">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2">Name</th>
              <th className="p-2">Address</th>
              <th className="p-2">Assigned User</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.length ? restaurants.map(r => (
              <tr key={r.id} className="border-b">
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.address}</td>
                <td className="p-2">{users.find(u => u.id === r.assignedUserId)?.email || '-'}</td>
                <td className="p-2 flex gap-2">
                  <button className="bg-yellow-200 px-2 py-1 rounded" onClick={() => startEdit(r)}>Edit</button>
                  <button className="bg-red-200 px-2 py-1 rounded" onClick={() => handleDelete(r.id)}>Delete</button>
                </td>
              </tr>
            )) : <tr><td colSpan={4} className="text-center">No restaurants found.</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}
