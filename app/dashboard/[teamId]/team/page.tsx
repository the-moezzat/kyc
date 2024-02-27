import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {columns, Team} from "./_components/columns";

import { faker } from '@faker-js/faker';
import AddMember from "@/components/add-member";
import React from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/db";
import {cookies} from "next/headers";

function createRandomUser(): Team {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });

    return {
        name: `${firstName} ${lastName}`,
        avatar: faker.image.avatar(),
        email,
        dateAdded: faker.date.past().toISOString(),
        lastActive: faker.date.past().toISOString(),
   };
}

function getData(count: number): Team[] {
    // Fetch data from your API here.
    const data: Team[] = [];
    for (let i = 0; i < count; i++) {
        data.push(createRandomUser());
    }
    return data;
}

export default async function Page({params}: {params: {teamId: string}}) {
    // const admin = getData(1);
    // const  users = getData(0);

    const supabase = createServerComponentClient<Database>({cookies})

    const {data} = await supabase.from('team').select('name').eq('id', params.teamId).single()

    const {data: teams, error} = await supabase.from('team_membership').select('id, profiles(full_name, email, avatar_url), join_date, role').eq('team_id', params.teamId)

    console.log(teams);

    const admin = teams?.filter((member) => member.role === 'admin' ||  member.role === 'owner').map((member) => (
        {name: member.profiles?.full_name!,
        email: member.profiles?.email!,
        avatar: member.profiles?.avatar_url!,
        dateAdded: member.join_date!,
        lastActive: faker.date.past().toDateString()}))

    console.log("admin", admin)

    const members = teams?.filter((member) => member.role === 'member').map((member) => (
        {name: member.profiles?.full_name!,
            email: member.profiles?.email!,
            avatar: member.profiles?.avatar_url!,
            dateAdded: member.join_date!,
            lastActive: faker.date.past().toISOString()}))

    return <>
        <div className={"flex justify-between max-md:flex-col gap-4"}>
            <div>
                <h1 className={'font-semibold text-gray-900 text-3xl'}>{data?.name} team members</h1>
                <p className={"text-gray-600 mt-2"}>Manage your team members and their account permissions here.</p>
            </div>
            <AddMember>
                <Button variant={"outline"} className={"shadow-sm text-gray-700 font-semibold space-x-2"}>
                    <Plus/>
                    <span>
                    Add team member
                </span>
                </Button>
            </AddMember>
        </div>

        <Separator orientation="horizontal" className="my-6"/>

        <div className={"grid grid-cols-[2fr,6fr] gap-8 max-md:grid-cols-1"}>
            <div>
                <h2 className={"font-semibold text-gray-800 text-lg"}>Admin users</h2>
                <p className={"text-gray-600 text-lg"}>Admins can add and remove users and manage organization-level
                    settings.</p>
            </div>
            <DataTable columns={columns} data={admin!} title={"Admins"}/>
        </div>

        <Separator orientation="horizontal" className="my-6"/>

        <div className={"grid grid-cols-[2fr,6fr] gap-8 max-md:grid-cols-1"}>
            <div>
                <h2 className={"font-semibold text-gray-800 text-lg"}>Account users</h2>
                <p className={"text-gray-600 text-lg"}>Account users can assess and review risks, questionnaires, data leaks and identify breaches.</p>
            </div>
            <DataTable columns={columns} data={members!} title={"Users"}/>
        </div>
    </>
}
