import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {columns, Team} from "./_components/columns";

import { faker } from '@faker-js/faker';
import AddMember from "@/app/dashboard/[teamId]/team/_components/add-member";

function createRandomUser(): Team {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });

    return {
        name: `${firstName} ${lastName}`,
        avatar: faker.image.avatar(),
        email,
        dateAdded: faker.date.past(),
        lastActive: faker.date.past(),
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

export default function Page({params}: {params: {teamId: string}}) {
    const admin = getData(1);
    const  users = getData(5);

    return <>
        <div className={"flex justify-between max-md:flex-col gap-4"}>
            <div>
                <h1 className={'font-semibold text-gray-900 text-3xl'}>Team members</h1>
                <p className={"text-gray-600 mt-2"}>Manage your team members and their account permissions here.</p>
            </div>
            <AddMember teamId={params.teamId}/>
        </div>

        <Separator orientation="horizontal" className="my-6"/>

        <div className={"grid grid-cols-[2fr,6fr] gap-8 max-md:grid-cols-1"}>
            <div>
                <h2 className={"font-semibold text-gray-800 text-lg"}>Admin users</h2>
                <p className={"text-gray-600 text-lg"}>Admins can add and remove users and manage organization-level
                    settings.</p>
            </div>
            <DataTable columns={columns} data={admin} title={"Admins"}/>
        </div>

        <Separator orientation="horizontal" className="my-6"/>

        <div className={"grid grid-cols-[2fr,6fr] gap-8 max-md:grid-cols-1"}>
            <div>
                <h2 className={"font-semibold text-gray-800 text-lg"}>Account users</h2>
                <p className={"text-gray-600 text-lg"}>Account users can assess and review risks, questionnaires, data leaks and identify breaches.</p>
            </div>
            <DataTable columns={columns} data={users} title={"Users"}/>
        </div>
    </>
}
