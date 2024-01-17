import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {columns, Team} from "./_components/columns";

import { faker } from '@faker-js/faker';

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

export default function Page() {
    const admin = getData(1);
    const  users = getData(5);

    return <>
        <div className={"flex justify-between"}>
            <div>
                <h1 className={'font-semibold text-gray-900 text-3xl'}>Team members</h1>
                <p className={"text-gray-600 mt-2"}>Manage your team members and their account permissions here.</p>

            </div>
            <Button variant={"outline"} className={"shadow-sm text-gray-700 font-semibold space-x-2"}>
                <Plus/>
                <span>
                    Add team member
                </span>
            </Button>
        </div>

        <Separator orientation="horizontal" className="my-6"/>

        <div className={"grid grid-cols-[2fr,6fr] gap-8"}>
            <div>
                <h2 className={"font-semibold text-gray-800 text-lg"}>Admin users</h2>
                <p className={"text-gray-600 text-lg"}>Admins can add and remove users and manage organization-level
                    settings.</p>
            </div>
            <DataTable columns={columns} data={admin} title={"Admins"}/>
        </div>

        <Separator orientation="horizontal" className="my-6"/>

        <div className={"grid grid-cols-[2fr,6fr] gap-8"}>
            <div>
                <h2 className={"font-semibold text-gray-800 text-lg"}>Account users</h2>
                <p className={"text-gray-600 text-lg"}>Account users can assess and review risks, questionnaires, data leaks and identify breaches.</p>
            </div>
            <DataTable columns={columns} data={users} title={"Admins"}/>
        </div>
    </>
}
