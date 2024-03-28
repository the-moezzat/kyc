'use client'

import React from 'react';
import {
    Carousel, type CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import {CreateTeamForm} from "@/app/team/create/_components/create-team-form";
import { createTeam } from './_actions/createTeam';
import {toast} from "sonner";
import InviteForm from "@/components/invite-form";
import {Button} from "@/components/ui/button";
import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

function Page() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    const [teamId, setTeamId] = React.useState('')
    const [myLocation, setMyLocation] = React.useState<Location>();

    const handleTeamCreate = async ({name}: {name: string}) => {
        const toastId = toast.loading('Creating team...')
        const {data: team, error} = await createTeam(name)
        if (error || !team) {
            toast.error('Failed to create team', {
                id: toastId,
                description: error?.message
            })
            return
        }

        toast.success('Team created successfully', {
            id: toastId
        })

        setTeamId(team.team_id!);

        api?.scrollNext();
        return
    }

    const handleInvite = async ({email}: {email:string}) => {
        const data = await fetch('/api/invite',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, teamId: teamId}),
        })

        console.log(data)
    }

    React.useEffect(() => {
        if (!api) return

        setMyLocation(window.location);

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })

    }, [teamId ,api])



    return (
        <>
            <Carousel
                setApi={setApi}
                opts={{watchDrag: false}}

            >
                <CarouselContent>
                    <CarouselItem>
                        <div className={'flex flex-col items-center justify-center gap-3 mb-12'}>
                            <h1 className={'text-3xl text-gray-800 font-bold'}>What should we called your team?</h1>
                            <p className={'text-gray-600'}>You can always change this later from settings.</p>
                        </div>

                        <CreateTeamForm onSubmit={handleTeamCreate}/>
                    </CarouselItem>
                    <CarouselItem>
                        <div className={'flex flex-col items-center'}>
                            <div className={'flex flex-col items-center justify-center gap-3 mb-12'}>
                                <h1 className={'text-3xl text-gray-800 font-bold'}>Who do you collaborate with?
                                </h1>
                                <p className={'text-gray-600'}>Invite teammates. Everyone will have access to the same dashboard.</p>
                            </div>

                            <div className={'flex flex-col gap-4 items-center justify-center'}>
                                <InviteForm onSubmit={handleInvite} className={'sm:w-96'}/>
                                <Button variant={'link'} className={'space-x-2'} onClick={() => navigator.clipboard.writeText(`${new URL(myLocation?.href!).origin}/invite/${teamId}`)} ><LinkIcon size={16}/> <span>
                                Copy Link Invite</span></Button>
                            </div>

                            <Link href={`/dashboard/${teamId}`}>
                                <Button size={"lg"} className={'px-24 mt-8'}>Create team</Button>
                            </Link>

                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>

            <div className="py-6 text-center text-sm text-muted-foreground">
                {current} of {count}
            </div>
        </>
    );
}

export default Page;