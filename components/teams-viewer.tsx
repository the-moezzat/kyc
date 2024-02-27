'use client'
import React, {useEffect} from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Link as LinkIcon, LogOut, Trash2} from 'lucide-react';
import { toast } from 'sonner';
import {usePathname} from "next/navigation";
import {createClientComponentClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/types/db";
import {useQuery} from "react-query";
import Link from 'next/link';
function TeamsViewer({children}: {children: React.ReactNode}) {

    const supabase = createClientComponentClient<Database>()

    const {data, isLoading, isError} = useQuery('owner', {
        queryFn: async () => {
            const {data: {session}} = await supabase.auth.getSession()

            const {data: members} = await supabase.from('team_membership').select('id, team (id, name, owner_id), join_date, role, member_id').eq('member_id', session?.user.id!);

            return members;
        }
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Teams</DialogTitle>
                    <DialogDescription>
                       Manage your teams from here
                    </DialogDescription>
                </DialogHeader>

                <div>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>Error</p>}
                    {!isLoading &&
                        !isError &&
                        data &&
                        data.filter((member) => member.role === 'owner' ).length !== 0 &&
                        <div>
                            <h3 className={'text-lg font-semibold mb-3 text-gray-800'}>Owner</h3>
                            <ul className={'flex flex-col gap-2 w-full'}>
                                {data.filter((member) => member.role === 'owner' ).map((member) => {
                                    return <li key={member.id} className={'flex items-center justify-between w-full'}>
                                        <div className={'space-y-1'}>
                                            <Link href={`/dashboard/${member.team?.id}`} className={'font-medium text-gray-700'}>{member.team?.name}</Link>
                                            <p className={'text-xs text-gray-600'}>
                                                <span>Created at &sdot; </span>
                                                {new Date(member.join_date!).toLocaleDateString()}</p>
                                        </div>

                                        <Button size={'icon'} variant={'ghost'} className={'text-red-500 hover:text-red-600'}><Trash2 size={18} /></Button>

                                    </li>
                                })}
                            </ul>
                        </div>
                    }

                    {!isLoading &&
                        !isError &&
                        data &&
                        data.filter((member) => member.role !== 'owner' ).length !== 0 &&
                        <div>
                            <h3 className={'text-lg font-semibold mb-3 text-gray-800 mt-3'}>Member At</h3>
                            <ul className={'flex flex-col gap-2'}>
                                {data.filter((member) => member.role !== 'owner' ).map((member) => {
                                    return <li key={member.id}  className={'flex items-center justify-between w-full'} >
                                        <div className={'space-y-1'}>
                                            <Link href={`/dashboard/${member.team?.id}`} className={'font-medium text-gray-700'}>{member.team?.name}</Link>
                                            <p className={'text-xs text-gray-600'}>
                                                <span>Joined at &sdot; </span>
                                                {new Date(member.join_date!).toLocaleDateString()}</p>
                                        </div>
                                        <Button size={'icon'} variant={'ghost'} className={'text-gray-500 '}><LogOut size={18}/></Button>
                                    </li>
                                })}
                            </ul>
                        </div>
                    }

                </div>

                {/*<DialogFooter className="sm:justify-start">*/}
                {/*    <DialogClose asChild>*/}
                {/*        <Button type="button" variant="secondary">*/}
                {/*            Close*/}
                {/*        </Button>*/}
                {/*    </DialogClose>*/}
                {/*</DialogFooter>*/}
            </DialogContent>
        </Dialog>
    );
}

export default TeamsViewer;