import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Separator} from "@/components/ui/separator";
import {KYCLinks, columns} from "./_components/columns";
import {DataTable} from "@/components/ui/data-table";

import { faker } from '@faker-js/faker';
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AddLink from "@/app/(dashboard)/links/_components/add-link";

function createRandomUser(): KYCLinks {
    return {
        name: faker.person.fullName(),
        date: faker.date.past(),
        link: faker.internet.url(),
    };
}

function getData(count: number): KYCLinks[] {
    // Fetch data from your API here.
    const data: KYCLinks[] = [];
    for (let i = 0; i < count; i++) {
        data.push(createRandomUser());
    }
    return data;
}

export default function Page() {
    const active = getData(6);
    const deleted = getData(3);

    return <>
        <div className={'flex justify-between'}>
            <h1 className={'font-semibold text-gray-900 text-3xl'}>KYC Links</h1>
            <AddLink/>
        </div>
        <Tabs defaultValue="active" className="w-full mt-8">
            <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="deleted">Deleted</TabsTrigger>
            </TabsList>

            <Separator orientation="horizontal" className="mt-1 mb-4" />

            <TabsContent value="active">
                <div className="mx-auto my-10">
                    <DataTable columns={columns} data={active} title={"KYC Links"}/>
                </div>
            </TabsContent>
            <TabsContent value="deleted">
                <div className="mx-auto my-10">
                    <DataTable columns={columns} data={deleted} title={"Deleted KYC Links"}/>
                </div>
            </TabsContent>
        </Tabs>
    </>
}