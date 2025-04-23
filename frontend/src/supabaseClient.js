import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jdwyvhuxxhzngfxbjiby.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impkd3l2aHV4eGh6bmdmeGJqaWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzA1ODksImV4cCI6MjA2MDYwNjU4OX0.lqkXn_V5tmmwFcUnQZZiNFdRMHw2QdQqUtr2yPoWBvs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
