import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';

export default function OnboardingChecklist() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/onboarding-task/employee')
      .then(setTasks)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function completeTask(id) {
    await apiFetch(`/onboarding-task/${id}/complete`, { method: 'PUT' });
    setTasks(tasks => tasks.map(t => t._id === id ? { ...t, status: 'completed', completedAt: new Date() } : t));
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Onboarding Checklist</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="bg-white rounded shadow p-6 flex flex-col gap-3">
        {tasks.length === 0 && <li>No onboarding tasks assigned.</li>}
        {tasks.map(task => (
          <li key={task._id} className="flex items-center gap-4 justify-between">
            <div>
              <div className="font-semibold">{task.task}</div>
              <div className="text-xs text-gray-500">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</div>
              {task.notes && <div className="text-xs text-gray-700">{task.notes}</div>}
            </div>
            {task.status === 'completed' ? (
              <span className="text-green-700 font-bold">Completed</span>
            ) : (
              <button onClick={() => completeTask(task._id)} className="bg-blue-700 text-white px-3 py-1 rounded">Mark Complete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
