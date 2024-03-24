import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import {NextRequest, NextResponse} from 'next/server';
import {Database} from "@/types/db";

// const I18nMiddleware = createI18nMiddleware({
//     locales: ['en', 'ar'],
//     defaultLocale: 'en'
// })

// The middleware is used to refresh the user's session before loading Server Component routes
export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const url = new URL(req.url);
    const supabase = createMiddlewareClient<Database>({req, res});

    const {
        data: {session},
    } = await supabase.auth.getSession();

    if (!session) {
        if (url.pathname.split('/')[1] === 'verify') {
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
        const {
            data: team,
            error
        } = await supabase.from('team_membership').select('team_id').eq('member_id', session.user.id);

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
        const {
            data: team,
            error
        } = await supabase.from('team_membership').select('team_id').eq('member_id', session.user.id).eq('team_id', teamId);


        if (!team || team.length === 0) {
            url.pathname = '/dashboard';
            return NextResponse.redirect(url);
        }
    }

    // add the user to the team using the invitation link
    if (url.pathname.split('/')[1] === 'invite') {
        const token = url.pathname.split('/')[2];
        const {data} = await supabase.from('team_membership').select('team_id').eq('member_id', session.user.id).eq('team_id', token);

        if (data?.length !== 0) {
            url.pathname = `/dashboard/${token}`;
            return NextResponse.redirect(url);
        }

        const {data: invite, error} = await supabase.from('team_membership').insert({
            team_id: token,
            role: 'member',
        })

        if (error) {
            url.pathname = '/dashboard';
            return NextResponse.redirect(url);
        }

        url.pathname = `/dashboard/${token}`;
        return NextResponse.redirect(url);
    }


    return null;
}

export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/(.*)/links',
        '/dashboard/(.*)',
        '/dashboard/(.*)/team',
        '/dashboard/(.*)/applications',
        '/verify/(.*)/(.*)/nationality',
        '/verify/(.*)/(.*)/signatures',
        '/verify/(.*)/(.*)/tasks',
        '/verify/(.*)/(.*)/upload-files',
        '/verify/(.*)/(.*)/income-verification',
        '/verify/(.*)/(.*)/employment-verification',
        '/team/(.*)',
        '/invite/(.*)',
        '/invite',
        '/'
    ],
};
