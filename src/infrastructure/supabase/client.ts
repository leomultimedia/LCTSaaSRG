import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('replace-me');

if (!isConfigured) {
  console.warn('InsightFlow ERROR: Supabase Client not configured. Replace NEXT_PUBLIC_SUPABASE_URL in .env.local with your real project URL.');
}

/**
 * Supabase client initialized for standard client-side usage.
 * Includes a safety check to prevent breaking the build if credentials are missing during initialization.
 */
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({} as ReturnType<typeof createClient>); 

