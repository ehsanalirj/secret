import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

export default function AssessmentManager() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/assessment')
      .then(setAssessments)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Assessments (Manager)</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2">Candidate</th>
            <th className="p-2">Type</th>
            <th className="p-2">Status</th>
            <th className="p-2">Score</th>
            <th className="p-2">Review</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map(a => (
            <tr key={a._id} className="border-b">
              <td className="p-2">{a.application?.name || '-'}</td>
              <td className="p-2">{a.type}</td>
              <td className="p-2">{a.submittedAt ? 'Submitted' : 'Pending'}</td>
              <td className="p-2">{a.totalScore ?? '-'}</td>
              <td className="p-2">
                {a.submittedAt && !a.reviewed && <ReviewAssessment assessment={a} />}
                {a.reviewed && <span className="text-green-700">Reviewed</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReviewAssessment({ assessment }) {
  const [score, setScore] = useState(assessment.totalScore || 0);
  const [reviewed, setReviewed] = useState(false);

  async function handleReview() {
    await apiFetch(`/assessment/${assessment._id}/review`, {
      method: 'PUT',
      body: JSON.stringify({ totalScore: score }),
    });
    setReviewed(true);
  }

  if (reviewed) return <span className="text-green-700">Reviewed</span>;

  return (
    <div className="flex gap-2 items-center">
      <input type="number" value={score} min={0} max={100} onChange={e => setScore(Number(e.target.value))} className="border p-1 rounded w-16" />
      <button onClick={handleReview} className="bg-blue-700 text-white px-2 py-1 rounded">Submit</button>
    </div>
  );
}
