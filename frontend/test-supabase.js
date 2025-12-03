// Quick test to check Supabase connection
require('dotenv').config({ path: '.env.local' });

console.log('Testing Supabase Configuration...\n');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set (length: ' + process.env.SUPABASE_ANON_KEY.length + ')' : 'NOT SET');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set (length: ' + process.env.SUPABASE_SERVICE_ROLE_KEY.length + ')' : 'NOT SET');

if (process.env.SUPABASE_ANON_KEY) {
  console.log('\nFirst 20 chars of ANON_KEY:', process.env.SUPABASE_ANON_KEY.substring(0, 20));
}
if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.log('First 20 chars of SERVICE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 20));
}
