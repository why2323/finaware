import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = 'https://yyswcljnicupbnfozgdv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5c3djbGpuaWN1cGJuZm96Z2R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDI3NDUsImV4cCI6MjA3NjA3ODc0NX0.34RQG8-LoTBFzGUGaF69uEAKNNwsyl0DmZACgV9eKk0';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);