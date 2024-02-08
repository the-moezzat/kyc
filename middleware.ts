import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

// The middleware is used to refresh the user's session before loading Server Component routes
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // supabase.auth.onAuthStateChange((event, session) => {
  //   console.log('onAuthStateChange', event, session);
  //   if (event === 'SIGNED_IN') redirect('/');
  // });

  if (!session) {
    const url = new URL(req.url);
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  return res;
}

export const config = {
  matcher: ['/links', '/home', '/team', '/applications', '/mobile'],
};
