import { NextResponse, NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import config from "@/config";
import { Database } from "@/types/db";

export const dynamic = "force-dynamic";

// This route is called after a successful login. It exchanges the code for a session and redirects to the callback URL (see config.js).
export async function GET(req: NextRequest) {
  // get params from the request
  const requestUrl = new URL(req.url);

  const id = requestUrl.searchParams.get('id');

  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const session =  await supabase.auth.exchangeCodeForSession(code);

    if (session.error)
      return NextResponse.redirect(requestUrl.origin + `/login`);
    
   const {data} = await supabase.from('travellers').upsert({user_id: session.data.user?.id}).eq("user_id", session.data.user?.id ).select('id').single();
   console.log(data);
  }

  if (id) 
    return NextResponse.redirect(requestUrl.origin + `/verify/${id}/nationality`);
  else
    return NextResponse.redirect(requestUrl.origin + config.auth.callbackUrl);
}
