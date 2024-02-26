import OverflowCard from "@/app/dashboard/[teamId]/_components/overview-card";
import {DataTable} from "@/components/ui/data-table";
import {columns, Verification} from "@/app/dashboard/[teamId]/_components/columns";;
import {createClient} from "@/lib/supabase/server";
import {cookies} from "next/headers";
import {Database} from "@/types/db";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";

export default async function Page({params}: {params: {teamId: string}}) {
    const supabase = createServerComponentClient<Database>({cookies})

    const {data} = await supabase.from('team').select('name').eq('id', params.teamId).single()

    return <div>
        <h1 className={'font-semibold text-gray-900 text-3xl'}>Welcome, <span className={'font-normal'}>{data?.name}</span> </h1>

        <div className={'grid grid-cols-4 gap-5 mt-12 max-md:mt-6 max-md:flex max-md:flex-col'}>
            <OverflowCard title={"Total"} value={230} color={" text-[hsla(206,100%,50%,1)] bg-[hsla(206,100%,97%,1)]"}/>
            <OverflowCard title={"Pending"} value={60} color={" text-[hsla(40,100%,50%,1)] bg-[hsla(40,100%,89%,1)]  "}/>
            <OverflowCard title={"Approved"} value={160} color={"text-[hsla(145,81%,50%,1)] bg-[hsla(145,81%,96%,1)] "}/>
            <OverflowCard title={"Rejection"} value={10} color={"text-[hsla(316,73%,50%,1)] bg-[hsla(316,73%,97%,1)] "}/>
        </div>
        <div className="mx-auto my-10">
            <DataTable columns={columns} data={[]} title={"Latest Verifications"}/>
        </div>
    </div>
}