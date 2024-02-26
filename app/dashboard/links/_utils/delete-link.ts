'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function deleteLink(linkId: string) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase.from('links').delete().eq('id', linkId)
  console.log(data);
  if (error) {
    console.error(error);
    return error;
  }

  return data;
}
