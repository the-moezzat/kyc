'use server';
import {cookies} from "next/headers";
import {createServerActionClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/db";

export async function createTeam(name: string) {
    const supabase = createServerActionClient<Database>({cookies})

    const {data: teamId, error: teamError} = await supabase.from('team').insert({
        name,
    }).select('id').single();

    if (teamError || !teamId) {
        return {error: teamError, data: null}
    }

    const {data, error} = await supabase.from('team_membership').insert({
        team_id: teamId.id,
        role: 'owner',
    }).select('*').single();

    if (!data || error) {
        return {error, data: null}
    }

    return {error: null, data: data}
}