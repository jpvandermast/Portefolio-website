import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/** Server-only client met de secret key (omzeilt RLS). Nooit in de frontend gebruiken. */
export function supabaseAdmin(): SupabaseClient {
  if (client) return client;
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error('Supabase server-configuratie ontbreekt');
  client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}
