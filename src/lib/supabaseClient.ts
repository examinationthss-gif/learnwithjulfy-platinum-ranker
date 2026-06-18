import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client with environment variables.
// Uses generic fallbacks to ensure Vercel static build routes don't fail when envs are not yet set during CI.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
