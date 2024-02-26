'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import CopiedText from '@/app/dashboard/links/_components/copied-link';
import DeleteLink from '@/app/dashboard/links/_components/delete-link';
import { Pen } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import EditLink from '@/app/dashboard/links/_components/edit-link';
import { Database } from '@/types/db';
import editLink from '../_utils/edit-link';

export type KYCLinks = Database['public']['Tables']['links']['Row'];
export const columns: ColumnDef<KYCLinks>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
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
    id: 'searchable',
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'created_at',
    header: 'Date Created',
    cell: ({ row }) => {
      const date = new Date(row.original.created_at).toLocaleDateString();
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: 'id',
    header: 'Link',
    cell: ({ row }) => {
      return <CopiedText text={row.original.id} />;
    },
  },

  {
    id: 'actions',
    cell: (row) => {
      return (
        <TooltipProvider>
          <div className={'flex gap-1 items-center justify-end'}>
            <Tooltip>
              <TooltipTrigger asChild>
                <EditLink link={row.row.original} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Link</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <DeleteLink link={row.row.original} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Link</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );
    },
  },
];
