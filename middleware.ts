import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import {createClient} from "@/lib/supabase/middleware";

// The middleware is used to refresh the user's session before loading Server Component routes
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = new URL(req.url);
  const supabase = createMiddlewareClient({req, res});



  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    if (url.pathname.split('/')[1] === 'verify'){
      const id = new URL(req.url).pathname.split('/')[2];
      url.pathname = `/login`;
      url.searchParams.set('id', id);
    } else {
      url.pathname = '/login';
    }
  
    return NextResponse.redirect(url);
  }

  // if user is logged in and tries to access /dashboard, redirect to the team dashboard
  if (url.pathname === '/dashboard') {
    const {data: team, error} = await supabase.from('team_membership').select('team_id');

    if (team?.length === 0) {
        url.pathname = '/team/create';
    } else {
      url.pathname = `/dashboard/${team?.[0].team_id}`;
    }
    return NextResponse.redirect(url);
  }

  // if user is logged in and tries to access team he isn't a member of, redirect to the team dashboard
  if (url.pathname.split('/')[1] === 'dashboard') {
      const teamId = url.pathname.split('/')[2];
      console.log(teamId)
      const {data: team, error} = await supabase.from('team_membership').select('team_id').eq('team_id', teamId);

      console.log(team)

      if (!team || team.length === 0) {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard',
    '/dashboard/(.*)/links',
    '/dashboard/(.*)',
    '/dashboard/(.*)//team',
    '/dashboard/(.*)//applications',
    '/verify/(.*)/nationality',
    '/verify/(.*)/signatures',
    '/verify/(.*)/tasks',
    '/verify/(.*)/upload-files',
    '/verify/(.*)/income-verification',
    '/verify/(.*)/employment-verification',
    '/team/(.*)'
  ],
};
