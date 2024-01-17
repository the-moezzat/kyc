"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import CopiedText from "@/app/(dashboard)/links/_components/copied-link";
import DeleteLink from "@/app/(dashboard)/links/_components/delete-link";

export type KYCLinks = {
    name: string
    date: Date;
    link: string;
}

export const columns: ColumnDef<KYCLinks>[] = [
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
    },
    {
        accessorKey: "date",
        header: "Date Created",
        cell: ({ row }) => {
            const date = row.original.date;
            return <span>{date.toLocaleDateString()}</span>
        }
    },
    {
        accessorKey: "link",
        header: "Link",
        cell: ({row}) => {
            const link = row.original.link;
            return <CopiedText text={link}/>
        }
    },

    {
        id: "actions",
        cell: () => {
            return (<DeleteLink/>)
        },
    },
]
