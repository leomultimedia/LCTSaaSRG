import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Database schema setup for Enterprise SaaS
// Run this in Supabase SQL Editor:
/*
create table organizations (
  id uuid references auth.users not null primary key,
  name text,
  trial_ends_at timestamp with time zone,
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table methodology_outcomes (
  id uuid default gen_random_uuid() primary key,
  submission_id uuid,
  template_id text,
  current_stage text,
  score_breakdown jsonb,
  calculated_at timestamp with time zone default timezone('utc'::text, now())
);
*/

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
