import { useState, useEffect } from 'react';
import { fetchAuditLogs } from '../api/auditLog';

export default function useAuditLogs(token, options = {}) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchAuditLogs(token, options)
      .then(setLogs)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [token, JSON.stringify(options)]);

  return { logs, loading, error };
}
