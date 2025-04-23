import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

export default function Assessment({ applicationId }) {
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch(`/assessment/candidate/${applicationId}`)
      .then(a => {
        setAssessment(a);
        setAnswers(a.questions.map(() => ''));
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [applicationId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch(`/assessment/${assessment._id}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers: assessment.questions.map((q, i) => ({ question: q.question, response: answers[i] })) }),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!assessment) return <div>No assessment assigned.</div>;
  if (submitted) return <div className="text-green-700">Assessment submitted!</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded shadow flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2">Assessment ({assessment.type.toUpperCase()})</h2>
      {assessment.questions.map((q, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="font-semibold">Q{i + 1}: {q.question}</div>
          {assessment.type === 'mcq' ? (
            <div className="flex gap-2 flex-wrap">
              {q.options.map((opt, j) => (
                <label key={j} className="flex items-center gap-1">
                  <input type="radio" name={`q${i}`} value={opt} checked={answers[i] === opt} onChange={() => setAnswers(a => a.map((v, k) => k === i ? opt : v))} required />
                  {opt}
                </label>
              ))}
            </div>
          ) : (
            <textarea value={answers[i]} onChange={e => setAnswers(a => a.map((v, k) => k === i ? e.target.value : v))} className="border p-2 rounded" rows={2} required />
          )}
        </div>
      ))}
      <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded self-start">Submit Assessment</button>
    </form>
  );
}
