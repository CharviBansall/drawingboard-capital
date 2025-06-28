import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/types-supabase';

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL || 'https://placeholder.supabase.co';
const SUPABASE_PUBLIC_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY || 'placeholder_key';

const supabase = createClient<Database>(
  SUPABASE_PROJECT_URL,
  SUPABASE_PUBLIC_KEY,
);

export default supabase;
