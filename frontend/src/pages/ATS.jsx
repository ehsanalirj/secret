import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

const statusStages = [
  'applied',
  'shortlisted',
  'interview',
  'offered',
  'hired',
  'rejected',
];

export default function ATS() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  function fetchApps() {
    setLoading(true);
    apiFetch('/application')
      .then(setApplications)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchApps();
  }, []);

  async function moveToStage(appId, newStatus) {
    try {
      await apiFetch(`/application/${appId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      fetchApps();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Applicant Tracking System (ATS)</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="flex gap-4 overflow-x-auto">
        {statusStages.map(stage => (
          <div key={stage} className="min-w-[260px] bg-blue-50 rounded-xl shadow p-4 flex-1">
            <div className="font-bold mb-2 capitalize">{stage}</div>
            <div className="flex flex-col gap-2">
              {applications.filter(app => app.status === stage).map(app => (
                <div key={app._id} className="bg-white rounded shadow p-3 flex flex-col gap-1">
                  <div className="font-semibold">{app.name}</div>
                  <div className="text-xs text-gray-500">{app.email}</div>
                  <div className="text-xs text-gray-500">{app.job?.title || '-'}</div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {statusStages.filter(s => s !== stage).map(s => (
                      <button
                        key={s}
                        className="text-xs bg-blue-200 rounded px-2 py-1 hover:bg-blue-700 hover:text-white transition"
                        onClick={() => moveToStage(app._id, s)}
                      >
                        Move to {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
