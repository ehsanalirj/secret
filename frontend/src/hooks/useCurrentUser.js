import { useState, useEffect } from 'react';

export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem('currentUser');
    if (data) {
      try {
        setUser(JSON.parse(data));
      } catch {
        setUser(null);
      }
    }
  }, []);
  return user;
}
