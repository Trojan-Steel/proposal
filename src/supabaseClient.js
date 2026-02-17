import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && anon ? createClient(url, anon) : null;
export const supabaseConfig = {
  isConfigured: Boolean(url && anon),
  hasUrl: Boolean(url),
  hasAnonKey: Boolean(anon),
};
