import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

export default function SalarySlipUpload() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [url, setUrl] = useState('');
  const [docName, setDocName] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/employee')
      .then(setEmployees)
      .catch(e => setError(e.message));
  }, []);

  async function handleSlipUpload(e) {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await apiFetch(`/salary-slip/${employeeId}`, {
        method: 'POST',
        body: JSON.stringify({ month, year, url }),
      });
      setSuccess('Salary slip uploaded!');
      setMonth(''); setYear(new Date().getFullYear()); setUrl('');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDocUpload(e) {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await apiFetch(`/salary-slip/${employeeId}/document`, {
        method: 'POST',
        body: JSON.stringify({ name: docName, url: docUrl }),
      });
      setSuccess('Document uploaded!');
      setDocName(''); setDocUrl('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Upload Salary Slip / Document</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-700 mb-2">{success}</div>}
      <form onSubmit={handleSlipUpload} className="bg-white rounded shadow p-6 mb-6 flex flex-col gap-3">
        <div className="font-semibold mb-1">Salary Slip</div>
        <select value={employeeId} onChange={e => setEmployeeId(e.target.value)} required className="border p-2 rounded">
          <option value="">Select Employee</option>
          {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name} ({emp.email})</option>)}
        </select>
        <input value={month} onChange={e => setMonth(e.target.value)} placeholder="Month (e.g. January)" className="border p-2 rounded" required />
        <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="Year" className="border p-2 rounded" required />
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="PDF URL" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded self-start">Upload Salary Slip</button>
      </form>
      <form onSubmit={handleDocUpload} className="bg-white rounded shadow p-6 flex flex-col gap-3">
        <div className="font-semibold mb-1">Employee Document</div>
        <select value={employeeId} onChange={e => setEmployeeId(e.target.value)} required className="border p-2 rounded">
          <option value="">Select Employee</option>
          {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name} ({emp.email})</option>)}
        </select>
        <input value={docName} onChange={e => setDocName(e.target.value)} placeholder="Document Name" className="border p-2 rounded" required />
        <input value={docUrl} onChange={e => setDocUrl(e.target.value)} placeholder="PDF URL" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded self-start">Upload Document</button>
      </form>
    </div>
  );
}
