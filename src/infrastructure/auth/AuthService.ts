import { supabase } from '../supabase/client';

export class AuthService {
  async loginWithAD() {
    // In a real production app, this triggers the OAuth flow with provider 'azure'
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'openid profile email',
        redirectTo: window.location.origin
      }
    });
    if (error) throw error;
    return data;
  }

  async signup(email: string, orgName: string) {
    // 1. Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: Math.random().toString(36).slice(-12), // Placeholder for demo, usually user picks
    });

    if (authError) throw authError;

    // 2. Provision the organization in our 'profiles' or 'organizations' table
    const { error: profileError } = await supabase
      .from('organizations')
      .insert({
        id: authData.user?.id,
        name: orgName,
        trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      });

    if (profileError) throw profileError;

    return authData;
  }
}
