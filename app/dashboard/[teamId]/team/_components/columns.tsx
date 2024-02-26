"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Pen, Trash2} from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Team = {
    name: string;
    email: string;
    avatar: string;
    dateAdded: Date;
    lastActive: Date;
}

export const columns: ColumnDef<Team>[] = [
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
        id: "searchable",
        accessorKey: "name",
        header: "Name",
        cell: ({row} )=> {
            const name = row.original.name
            const email = row.original.email
            const avatar = row.original.avatar

            return <div className={'flex gap-2 items-center'}>
                <Avatar>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}</AvatarFallback>
                </Avatar>
                <div className={'flex flex-col'}>
                    <p className={'text-sm text-gray-800'}>
                        {name}
                    </p>
                    <p className={'text-sm text-gray-600'}>
                        {email}
                    </p>
                </div>
            </div>
        },
    },
    {
        accessorKey: "dateAdded",
        header: "Date Added",
        cell: ({ row }) => {
            const date = row.original.dateAdded
            return <span>{date.toLocaleDateString()}</span>
        }
    },{
        accessorKey: "lastActive",
        header: "Last Active",
        cell: ({ row }) => {
            const date = row.original.dateAdded
            return <span>{date.toLocaleDateString()}</span>
        }
    },

    {
        id: "actions",
        cell: () => {
            return ( <div className={'flex gap-2'}>
                    <Button variant={"ghost"} size={"icon"} className={""}>
                        <Trash2 size={20}/>
                    </Button>
                    <Button variant={"ghost"} size={"icon"} className={""}>
                        <Pen  size={20}/>
                    </Button>
                </div>
        )
        },
    },
]
