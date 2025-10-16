import { supabase } from '@/integrations/supabase/client';

// Admin email allowlist
export const ADMIN_EMAIL = 'abhijeetmore6969@gmail.com';

export const isAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.email === ADMIN_EMAIL;
};

export { supabase };