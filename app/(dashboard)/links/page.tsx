'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { KYCLinks, columns } from './_components/columns';
import { DataTable } from '@/components/ui/data-table';
import AddLink from '@/app/(dashboard)/links/_components/add-link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';
import { useQuery } from 'react-query';

export default function Page() {
  const supabase = createClientComponentClient<Database>();

  const { data } = useQuery('links', async () => {
    const { data } = await supabase.from('links').select('*');
    return data;
  });

  const active = data
    ? data?.filter((link: KYCLinks) => link.state === 'active')
    : [];
  const deleted = data
    ? data?.filter((link: KYCLinks) => link.state === 'deleted')
    : [];

  return (
    <>
      <div className={'flex justify-between'}>
        <h1 className={'font-semibold text-gray-900 text-3xl'}>KYC Links</h1>
        <AddLink />
      </div>
      <Tabs defaultValue="active" className="w-full mt-8">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="deleted">Deleted</TabsTrigger>
        </TabsList>

        <Separator orientation="horizontal" className="mt-1 mb-4" />

        <TabsContent value="active">
          <div className="mx-auto my-10">
            <DataTable columns={columns} data={active} title={'KYC Links'} />
          </div>
        </TabsContent>
        <TabsContent value="deleted">
          <div className="mx-auto my-10">
            <DataTable
              columns={columns}
              data={deleted}
              title={'Deleted KYC Links'}
            />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
