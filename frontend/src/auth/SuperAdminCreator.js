import { supabase } from '../supabaseClient';

export async function createSuperAdmin(email, password) {
  // Sign up user
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role: 'superadmin' } }
  });
  if (error) throw error;
  // Optionally: Set up custom claims or insert into a roles table
  return user;
}
