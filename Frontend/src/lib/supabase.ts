import { createClient } from "@supabase/supabase-js";
import { Database } from "./types-supabase";

// import { SUPABASE_API_KEY, SUPABASE_PROJECT_URL } from "../config/keys";

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient<Database>(SUPABASE_PROJECT_URL, SUPABASE_API_KEY);

export default supabase;
