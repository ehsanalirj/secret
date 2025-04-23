import React, { useState, useEffect } from "react";
import { apiFetch } from "../../api";

function TenantForm({ tenant, onSave, onClose, loading }) {
  const [form, setForm] = useState(
    tenant || {
      name: "",
      plan: "free",
      status: "sandbox",
      domain: "",
      logo: "",
      complianceTags: "",
      dataClassification: "internal",
      dataResidency: "EU",
    }
  );
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-[400px] flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-2">{tenant ? "Edit Tenant" : "Add Tenant"}</h2>
        <input className="input" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input className="input" placeholder="Domain" value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))} />
        <select className="input" value={form.plan} onChange={e => setForm(f => ({ ...f, plan: e.target.value }))}>
          <option value="free">Free</option><option value="pro">Pro</option><option value="enterprise">Enterprise</option>
        </select>
        <select className="input" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
          <option value="live">Live</option><option value="sandbox">Sandbox</option>
        </select>
        <input className="input" placeholder="Logo (emoji/url)" value={form.logo} onChange={e => setForm(f => ({ ...f, logo: e.target.value }))} />
        <input className="input" placeholder="Compliance Tags (comma separated)" value={form.complianceTags} onChange={e => setForm(f => ({ ...f, complianceTags: e.target.value }))} />
        <select className="input" value={form.dataClassification} onChange={e => setForm(f => ({ ...f, dataClassification: e.target.value }))}>
          <option value="public">Public</option>
          <option value="internal">Internal</option>
          <option value="confidential">Confidential</option>
          <option value="restricted">Restricted</option>
        </select>
        <select className="input" value={form.dataResidency} onChange={e => setForm(f => ({ ...f, dataResidency: e.target.value }))}>
          <option value="EU">EU</option><option value="US">US</option><option value="APAC">APAC</option><option value="Other">Other</option>
        </select>
        <div className="flex gap-2 mt-2">
          <button className="btn-primary flex-1" disabled={loading} onClick={() => onSave(form)}>{tenant ? "Save" : "Add"}</button>
          <button className="btn flex-1" disabled={loading} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editTenant, setEditTenant] = useState(null);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchTenants();
  }, []);

  async function fetchTenants() {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/tenants");
      setTenants(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const filtered = tenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) &&
    (!filter || t.plan === filter)
  );

  async function handleAdd(form) {
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...form,
        complianceTags: form.complianceTags.split(",").map(s => s.trim()).filter(Boolean),
      };
      await apiFetch("/tenants", { method: "POST", body: JSON.stringify(payload) });
      setSuccess("Tenant added.");
      setShowForm(false);
      fetchTenants();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(form) {
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...form,
        complianceTags: form.complianceTags.split(",").map(s => s.trim()).filter(Boolean),
      };
      await apiFetch(`/tenants/${editTenant._id}`, { method: "PUT", body: JSON.stringify(payload) });
      setSuccess("Tenant updated.");
      setEditTenant(null);
      fetchTenants();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this tenant?")) return;
    setLoading(true);
    setError("");
    try {
      await apiFetch(`/tenants/${id}`, { method: "DELETE" });
      setSuccess("Tenant deleted.");
      fetchTenants();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-900 mb-1 drop-shadow-sm">Tenant & Restaurant Management</h1>
          <p className="text-blue-700 text-lg max-w-xl">Onboard, modify, and manage restaurant tenants, branches, and analytics.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}>+ Add Tenant</button>
      </div>
      <div className="flex gap-4 mb-2">
        <input className="input flex-1" placeholder="Search tenants..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="input" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All Plans</option>
          <option value="free">Free</option><option value="pro">Pro</option><option value="enterprise">Enterprise</option>
        </select>
        <button className="btn" onClick={() => alert('Export coming soon!')}>Export</button>
      </div>
      {error && <div className="bg-red-100 text-red-700 rounded p-2 mb-2">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 rounded p-2 mb-2">{success}</div>}
      {loading && <div className="text-blue-600">Loading...</div>}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white/80">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-blue-50 text-blue-900">
              <th className="p-3">Name</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Status</th>
              <th className="p-3">Domain</th>
              <th className="p-3">Compliance Tags</th>
              <th className="p-3">Data Residency</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center text-gray-400 py-8">No tenants found.</td></tr>
            )}
            {filtered.map(t => (
              <tr key={t._id} className="border-b hover:bg-blue-50">
                <td className="p-3 font-semibold">{t.name}</td>
                <td className="p-3">{t.plan}</td>
                <td className="p-3">{t.sandbox ? "Sandbox" : "Live"}</td>
                <td className="p-3">{t.domain}</td>
                <td className="p-3">{(t.complianceTags || []).join(", ")}</td>
                <td className="p-3">{t.dataResidency}</td>
                <td className="p-3 flex gap-2">
                  <button className="btn" onClick={() => setEditTenant(t)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(t._id)}>Delete</button>
                  <button className="btn" onClick={() => alert('Branch & Maps UI coming soon!')}>Branches</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modals for Add/Edit Tenant */}
      {showForm && <TenantForm onSave={handleAdd} onClose={() => setShowForm(false)} loading={loading} />}
      {editTenant && <TenantForm tenant={editTenant} onSave={handleEdit} onClose={() => setEditTenant(null)} loading={loading} />}
    </div>
  );
}
