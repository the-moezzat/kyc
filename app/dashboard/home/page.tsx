import OverflowCard from "@/app/dashboard/home/_components/overview-card";
import {DataTable} from "@/components/ui/data-table";
import {columns, Verification} from "./_components/columns";
import { faker } from '@faker-js/faker';

// function createRandomUser(): Verification {
//     const firstName = faker.person.firstName();
//     const lastName = faker.person.lastName();
//     const email = faker.internet.email({ firstName, lastName });
//
//     return {
//         name: `${firstName} ${lastName}`,
//         country: faker.location.countryCode().toLowerCase(),
//         email,
//         submission: faker.date.past(),
//         ref: faker.string.nanoid(8),
//         risk: faker.helpers.arrayElement(["Low Risk", "High Risk", "Medium Risk"]),
//         status: faker.helpers.arrayElement(["pending", "processing", "success", "failed"]),
//         tags: faker.helpers.arrayElements(["High Income", "Employed", "Signed"], faker.datatype.number({ min: 1, max: 3 })),
//     };
// }

// function getData(count: number): Verification[] {
//     // Fetch data from your API here.
//     const data: Verification[] = [];
//     for (let i = 0; i < count; i++) {
//         data.push(createRandomUser());
//     }
//     return data;
// }
export default function Page() {
    // const data = getData(12);

    return <div>
        <h1 className={'font-semibold text-gray-900 text-3xl'}>Home</h1>

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