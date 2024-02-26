'use client'
import React from 'react';
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
import {Link as LinkIcon, Plus} from 'lucide-react';
import InviteForm from "@/components/invite-form";
import { toast } from 'sonner';
function AddMember({teamId}: {teamId: string}) {
    const handleInvite = async ({email}: {email:string}) => {
        const data = await fetch('/api/invite',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, teamId: teamId}),
        })

        toast.success('Invitation sent successfully')

        console.log(data)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className={"shadow-sm text-gray-700 font-semibold space-x-2"}>
                    <Plus/>
                    <span>
                    Add team member
                </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Send invitation</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view the dashboard.
                    </DialogDescription>
                </DialogHeader>

                <div className={'flex flex-col gap-4 items-center justify-center w-full'}>
                    <InviteForm onSubmit={handleInvite} className={'w-full'}/>
                    <Button variant={'link'} className={'space-x-2'}
                    onClick={() => navigator.clipboard.writeText(`${new URL(window.location.href!).origin}/invite/${teamId}`)}>
                        <LinkIcon size={16}/>
                        <span>Copy Link Invite</span>
                    </Button>
                </div>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddMember;