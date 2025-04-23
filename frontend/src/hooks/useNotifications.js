import { useState, useEffect } from 'react';
import { fetchNotifications } from '../api/notifications';

export default function useNotifications(token) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchNotifications(token)
      .then(setNotifications)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return { notifications, loading, error };
}
