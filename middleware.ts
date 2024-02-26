import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

// The middleware is used to refresh the user's session before loading Server Component routes
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const url = new URL(req.url);

    if (url.pathname.split('/')[1] === 'verify'){
      const id = new URL(req.url).pathname.split('/')[2];
      url.pathname = `/login`;
      url.searchParams.set('id', id);
    } else {
      url.pathname = '/login';
    }
  
    return NextResponse.redirect(url);
  }
  return res;
}

export const config = {
  matcher: [
    '/links',
    '/home',
    '/team',
    '/applications',
    '/verify/(.*)/nationality',
    '/verify/(.*)/signatures',
    '/verify/(.*)/tasks',
    '/verify/(.*)/upload-files',
    '/verify/(.*)/income-verification',
    '/verify/(.*)/employment-verification',
    '/team/(.*)'
  ],
};
