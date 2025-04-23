import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

export default function AssessmentAssign() {
  const [applications, setApplications] = useState([]);
  const [type, setType] = useState('mcq');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '', maxScore: 1 }]);
  const [selectedApp, setSelectedApp] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/application')
      .then(setApplications)
      .catch(e => setError(e.message));
  }, []);

  function handleQuestionChange(i, field, value) {
    setQuestions(qs => qs.map((q, idx) => idx === i ? { ...q, [field]: value } : q));
  }
  function handleOptionChange(qIdx, optIdx, value) {
    setQuestions(qs => qs.map((q, i) => i === qIdx ? { ...q, options: q.options.map((o, j) => j === optIdx ? value : o) } : q));
  }
  function addQuestion() {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '', maxScore: 1 }]);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); setSuccess(false);
    try {
      await apiFetch('/assessment', {
        method: 'POST',
        body: JSON.stringify({ application: selectedApp, type, questions }),
      });
      setSuccess(true);
      setQuestions([{ question: '', options: ['', '', '', ''], answer: '', maxScore: 1 }]);
      setSelectedApp('');
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded shadow flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2">Assign Assessment</h2>
      <select value={selectedApp} onChange={e => setSelectedApp(e.target.value)} required className="border p-2 rounded">
        <option value="">Select Candidate</option>
        {applications.map(app => <option key={app._id} value={app._id}>{app.name} ({app.job?.title || '-'})</option>)}
      </select>
      <select value={type} onChange={e => setType(e.target.value)} className="border p-2 rounded">
        <option value="mcq">MCQ</option>
        <option value="coding">Coding</option>
        <option value="custom">Custom</option>
      </select>
      {questions.map((q, i) => (
        <div key={i} className="border rounded p-3 mb-2">
          <input value={q.question} onChange={e => handleQuestionChange(i, 'question', e.target.value)} placeholder="Question" className="border p-2 rounded w-full mb-2" required />
          {type === 'mcq' && (
            <div className="flex flex-col gap-1 mb-2">
              {q.options.map((opt, j) => (
                <input key={j} value={opt} onChange={e => handleOptionChange(i, j, e.target.value)} placeholder={`Option ${j + 1}`} className="border p-2 rounded" required />
              ))}
              <input value={q.answer} onChange={e => handleQuestionChange(i, 'answer', e.target.value)} placeholder="Correct Answer" className="border p-2 rounded" required />
            </div>
          )}
          <input type="number" value={q.maxScore} min={1} max={100} onChange={e => handleQuestionChange(i, 'maxScore', e.target.value)} placeholder="Max Score" className="border p-2 rounded w-32" required />
        </div>
      ))}
      <button type="button" onClick={addQuestion} className="bg-blue-100 text-blue-900 px-3 py-1 rounded self-start">Add Question</button>
      <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded self-start">Assign Assessment</button>
      {success && <div className="text-green-700">Assessment assigned!</div>}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
}
