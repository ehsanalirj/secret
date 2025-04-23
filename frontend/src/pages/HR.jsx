import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

export default function HR() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  function fetchEmployees() {
    setLoading(true);
    apiFetch('/employee')
      .then(setEmployees)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Human Resources</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <table className="w-full mt-4 bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Role</th>
            <th className="p-2">Department</th>
            <th className="p-2">Status</th>
            <th className="p-2">Start Date</th>
            <th className="p-2">Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id} className="border-b hover:bg-blue-50">
              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.email}</td>
              <td className="p-2">{emp.phone || '-'}</td>
              <td className="p-2">{emp.role}</td>
              <td className="p-2">{emp.department || '-'}</td>
              <td className="p-2">{emp.status}</td>
              <td className="p-2 text-xs">{emp.startDate ? new Date(emp.startDate).toLocaleDateString() : '-'}</td>
              <td className="p-2 text-right">{emp.salary ? `₨${emp.salary.toLocaleString()}` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
