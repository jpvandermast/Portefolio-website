import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

/** Client met alleen de publishable key; null als de env vars ontbreken. */
export const supabase =
  url && publishableKey ? createClient(url, publishableKey) : null;
