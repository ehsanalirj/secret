import { useState, useEffect } from 'react';
import { fetchOrders } from '../api/orders';

export default function useOrders(token) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchOrders(token)
      .then(setOrders)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return { orders, loading, error };
}
