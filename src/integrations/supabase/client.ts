import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const url = import.meta.env["VITE_SUPABASE_URL"] as string;
const key = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string;

export const supabase =
  url && key
    ? createClient<Database>(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;
