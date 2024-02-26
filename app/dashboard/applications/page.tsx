import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator';
import {DataTable} from "@/components/ui/data-table";
import {columns, Verification} from "./_components/columns";
import { faker } from '@faker-js/faker';
import {Button} from "@/components/ui/button";
import Link from "next/link";

function createRandomUser(): Verification {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });

    return {
        name: `${firstName} ${lastName}`,
        country: faker.location.countryCode().toLowerCase(),
        email,
        submission: faker.date.past(),
        ref: faker.string.nanoid(8),
        risk: faker.helpers.arrayElement(["Low Risk", "High Risk", "Medium Risk"]),
        status: faker.helpers.arrayElement(["pending", "processing", "success", "failed"]),
        tags: faker.helpers.arrayElements(["High Income", "Employed", "Signed"], faker.datatype.number({ min: 1, max: 3 })),
    };
}

function getData(count: number): Verification[] {
    // Fetch data from your API here.
    const data: Verification[] = [];
    for (let i = 0; i < count; i++) {
        data.push(createRandomUser());
    }
    return data;
}

export default function Page() {
    const pending = getData(5)
    const accepted = getData(8)
    const rejected = getData(2)

    return <>
        <header className={'flex items-center justify-between'}>
            <h1 className={'font-semibold text-gray-900 text-3xl'}>Applications</h1>
            <Link href={'/applications/risk-engine'}>
                <Button variant={'outline'}  className={"font-semibold shadow-sm"}>Risk Engine</Button>
            </Link>
        </header>
        <Tabs defaultValue="pending" className="w-full mt-8">
            <TabsList>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <Separator orientation="horizontal" className="mt-1 mb-4" />

            <TabsContent value="pending">
                <div className="mx-auto my-10">
                    <DataTable columns={columns} data={pending} title={"Pending Verifications"}/>
                </div>
            </TabsContent>
            <TabsContent value="accepted">
                <div className="mx-auto my-10">
                    <DataTable columns={columns} data={accepted} title={"Accepted Verifications"}/>
                </div>
            </TabsContent>
            <TabsContent value="rejected">
                <div className="mx-auto my-10">
                    <DataTable columns={columns} data={rejected} title={"Rejected Verifications"}/>
                </div>
            </TabsContent>
        </Tabs>

    </>
}
