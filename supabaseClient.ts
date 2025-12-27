
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (window as any).env?.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = (window as any).env?.SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
