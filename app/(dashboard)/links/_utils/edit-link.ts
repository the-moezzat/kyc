'use server'
import { createServerActionClient} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"

export default async function editLink({id, name}: {id: string, name: string}) {
  const supabase = createServerActionClient({cookies});
  const { data, error } = await supabase.from('links').update({name}).eq('id', id).select();
  console.log(data);
  if (error) {
    console.error(error);
    return error;
  } 

  return data;
}