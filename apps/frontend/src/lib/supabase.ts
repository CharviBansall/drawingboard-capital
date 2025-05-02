import { createClient } from "@supabase/supabase-js";
import { Database } from "./types-supabase";

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const SUPABASE_PUBLIC_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;
const supabase = createClient<Database>(
  SUPABASE_PROJECT_URL,
  SUPABASE_PUBLIC_KEY
);

export default supabase;
