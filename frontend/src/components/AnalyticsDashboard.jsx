import React from 'react';
import useAnalytics from '../hooks/useAnalytics';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function AnalyticsDashboard() {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
  const { analytics, loading, error } = useAnalytics(token);

  if (!token) return <div className="text-xs text-red-500">No authentication token found.</div>;

  // Example chart data
  const chartData = {
    labels: analytics.map(a => new Date(a.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Installs',
        data: analytics.map(a => a.installs || 0),
        backgroundColor: 'rgba(59,130,246,0.5)',
      },
      {
        label: 'Active Users',
        data: analytics.map(a => (a.metrics?.activeUsers || 0)),
        backgroundColor: 'rgba(16,185,129,0.5)',
      },
    ],
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-2">Analytics Dashboard</h2>
      {loading ? <div>Loading...</div> : (
        <Bar data={chartData} />
      )}
    </div>
  );
}
