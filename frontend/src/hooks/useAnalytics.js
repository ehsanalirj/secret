import { useState, useEffect } from 'react';
import { fetchAnalytics } from '../api/analytics';

export default function useAnalytics(token, options = {}) {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchAnalytics(token, options)
      .then(setAnalytics)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [token, JSON.stringify(options)]);

  return { analytics, loading, error };
}
