import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(env("NEXT_PUBLIC_SUPABASE_URL") && env("SUPABASE_SERVICE_ROLE_KEY"));
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = env("NEXT_PUBLIC_SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getSupabasePublicUrl(path: string): string | null {
  const url = env("NEXT_PUBLIC_SUPABASE_URL");
  if (!url) return null;
  return `${url}/storage/v1/object/public/uploads/${path.replace(/^\/+/, "")}`;
}
