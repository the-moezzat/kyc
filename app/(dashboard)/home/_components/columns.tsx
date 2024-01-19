"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Badge} from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import countries from "@/lib/counry";
import "flag-icons/css/flag-icons.min.css";
// import { US } from 'country-flag-icons/react/3x2'



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Verification = {
    country: string;
    email: string;
    name: string;
    ref: string;
    risk: "Low Risk" | "High Risk" | "Medium Risk";
    status: "pending" | "processing" | "success" | "failed";
    submission: Date;
    tags: string[];
}

export const columns: ColumnDef<Verification>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "ref",
        header: "Reference",
    },
    {
        accessorKey: "risk",
        header: "Risk level",
        cell: ({ row }) => {
            const risk = row.getValue("risk") as Verification["risk"]
            return (<Badge className={'shrink-0 grow w-max'} variant={risk === "Low Risk" ? "success" : risk === "Medium Risk" ? "warning" : "danger"}>{row.getValue("risk")}</Badge>)
        }
    },
    {
        id:"searchable",
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const fullName = row.original.name
            const email = row.original.email
            const country = row.original.country

            return <div className={'flex gap-2 items-center'}>
                {/*<img*/}
                {/*    src={countries[country].mini}*/}
                {/*    alt={country}*/}
                {/*    className={'w-8 h-6 rounded-sm object-cover object-center'}*/}
                {/*/>*/}
                <div className={"text-2xl h-6 p-0"}>
                    <div className={`fi fi-${country} rounded-sm overflow-hidden`}></div>
                    {/*<US className={'w-8 h-6'}/>*/}
                </div>
                {/*<span className="fi fi-gr fis"></span>*/}
                <div className={'flex flex-col'}>
                    <p className={'text-sm text-gray-800'}>
                        {fullName}
                    </p>
                    <p className={'text-sm text-gray-600'}>
                        {email}
                    </p>
                </div>
            </div>
        }
    },

    {
        accessorKey: "submission",
        header: "Submission",
        cell: ({ row }) => {
            const date = row.getValue("submission") as Verification["submission"]
            return <span>{date.toLocaleDateString()}</span>
        }
    },

    {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
            const tags = row.getValue("tags") as Verification["tags"]
            return <div className={'flex gap-1'}>
                {tags.map((tag, i) => <Badge className={'w-max'} key={i} variant={'outline'}>{tag}</Badge>)}
            </div>
        }
    },

    {
        id: "actions",
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Accept</DropdownMenuItem>
                        <DropdownMenuItem>Reject</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
