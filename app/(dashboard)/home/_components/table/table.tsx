import { Verification, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Verification[]> {
    // Fetch data from your API here.
    return [
        {
            ref: "728ed52f",
            risk: "Low Risk",
            status: "pending",
            tags: ["High Income", "Employed"],
            submission: new Date(),
            name: {fullName: "Talha Ibn-Khaled", email: "a@abc.com", country: "sa"}
        },{
            ref: "728ed52f",
            risk: "Low Risk",
            status: "pending",
            tags: ["High Income", "Employed"],
            submission: new Date(),
            name: {fullName: "Mohamed Ezzat", email: "a@abc.com", country: "eg"}
        },{
            ref: "728ed52f",
            risk: "Medium Risk",
            status: "pending",
            tags: ["High Income", "Employed"],
            submission: new Date(),
            name: {fullName: "Karem Ahmed", email: "a@abc.com", country: "ps"}
        },{
            ref: "728ed52f",
            risk: "High Risk",
            status: "pending",
            tags: ["Signed"],
            submission: new Date(),
            name: {fullName: "Mostafa Ali", email: "a@abc.com", country: "us"}

        },

    ]
}

export default async function Table() {
    const data = await getData()

    return (
        <div className="mx-auto my-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
