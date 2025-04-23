import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

export default function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/job')
      .then(setJobs)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Join Our Team</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid gap-6">
        {jobs.map(job => (
          <div key={job._id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">{job.title}</span>
              <span className="ml-auto text-xs bg-blue-100 text-blue-800 rounded px-2 py-1">{job.department || 'General'}</span>
            </div>
            <div className="text-gray-700">{job.description}</div>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>Location: {job.location || 'Any'}</span>
              <span>Posted: {new Date(job.postedAt).toLocaleDateString()}</span>
            </div>
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-700">Requirements</summary>
              <div className="text-gray-600 mt-1 whitespace-pre-line">{job.requirements || 'See job description.'}</div>
            </details>
            <JobApplyForm jobId={job._id} />
          </div>
        ))}
      </div>
    </div>
  );
}

function JobApplyForm({ jobId }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', resumeUrl: '', answers: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await apiFetch('/application', {
        method: 'POST',
        body: JSON.stringify({ ...form, job: jobId }),
      });
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', resumeUrl: '', answers: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <div className="flex gap-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="border p-2 rounded flex-1" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="border p-2 rounded flex-1" />
      </div>
      <div className="flex gap-2">
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded flex-1" />
        <input name="resumeUrl" value={form.resumeUrl} onChange={handleChange} placeholder="Resume Link (URL)" className="border p-2 rounded flex-1" />
      </div>
      <textarea name="answers" value={form.answers} onChange={handleChange} placeholder="Why are you a good fit?" className="border p-2 rounded resize-none" rows={2} />
      <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 self-start" disabled={loading}>
        {loading ? 'Applying...' : 'Apply'}
      </button>
      {success && <div className="text-green-700">Application submitted!</div>}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
}
