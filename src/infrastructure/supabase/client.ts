import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Ensure .env.local is configured properly.');
}

/**
 * Supabase client initialized for standard client-side usage.
 * Ensure Row Level Security (RLS) policies are active on all public tables!
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
