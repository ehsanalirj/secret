import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export function useSupabaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user and metadata from Supabase
  async function fetchUser() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user ?? null);
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return { user, loading, refreshUser: fetchUser };
}
