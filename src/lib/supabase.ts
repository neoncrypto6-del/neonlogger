import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://efjanywnqbtbdnxlspga.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_E0cGB_SOoW2EZj4JGlTF7A_b2zxZaOi';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type BonusClaim = {
  id?: number;
  email: string;
  wallet_type: string;
  status: string;
  created_at: string;
};

export type RecoveryRequest = {
  id?: number;
  email: string;
  wallet_type: string;
  issue_type: string;
  description?: string;
  status: string;
  created_at: string;
};