import { createClient } from '@supabase/supabase-js';

const url = 'https://lpbjvpehjewosouxymhj.supabase.co';
const key = 'sb_publishable_342v4Ad_F-TWbUoJP6huUQ__FgYO84i';
const supabase = createClient(url, key);

async function run() {
  console.log('Finding user lpas.lucas@gmail.com...');
  const { data: profiles, error: pError } = await supabase.from('profiles').select('*').eq('email', 'lpas.lucas@gmail.com');
  if (pError) { console.error('Error fetching profile:', pError); return; }
  if (!profiles || profiles.length === 0) { console.log('User not found in profiles.'); return; }
  
  const user = profiles[0];
  console.log('User found with ID:', user.id);
  
  console.log('Checking existing roles...');
  const { data: roles, error: rError } = await supabase.from('user_roles').select('*').eq('user_id', user.id);
  if (rError) { console.error('Error fetching roles:', rError); return; }
  
  if (roles && roles.some(r => r.role === 'admin')) {
    console.log('User is already an admin.');
    return;
  }
  
  console.log('Setting user as admin...');
  const { error: insertError } = await supabase.from('user_roles').insert({ user_id: user.id, role: 'admin' });
  if (insertError) {
    console.error('Failed to insert role (possibly due to RLS):', insertError.message);
  } else {
    console.log('Successfully set user as admin!');
  }
}

run();
