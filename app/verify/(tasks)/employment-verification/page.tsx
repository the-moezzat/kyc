'use client';
import React from 'react';
import StartVerification from "@/app/mobile/(tasks)/_components/start-verification";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {CheckCircle} from "lucide-react";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import Credentials from "@/app/mobile/(tasks)/_components/credentials";
import SuccessfullyMessage from "@/app/mobile/(tasks)/_components/successfully-message";

// function Page() {
//     return (
//         <div className={'flex flex-col h-full py-8'}>
//             <StartVerification title={'Verify Your Employment'} icon={<Image src={'/office.png'} alt={'bank icon'} width={62} height={62}/>}/>
//
//             <div className={'mt-auto space-y-2 text-center'}>
//                 <Button size={'lg'} className={'w-full'} >Verify instantly</Button>
//                 <p className={"text-xs text-gray-400"}>By continuing, you agree to the terms & privacy policy</p>
//             </div>
//         </div>
//     );
// }

// export default Page;

function Page() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)


    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            console.log("current")
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
            <div className={"max-w-screen-sm"}>
                <Carousel orientation={'vertical'} setApi={setApi} opts={{watchDrag: false}} className={'h-[calc(100dvh-64px)] w-full'}>
                    <CarouselContent className={'h-[calc(100dvh-64px)] '}>
                        <CarouselItem  className={'h-full'}>
                            <div className={'flex flex-col h-full py-4'}>
                                <StartVerification
                                    title={'Verify Your Employment'}
                                    icon={<Image src={'/office.png'} alt={'bank icon'} width={62} height={62}/>}
                                />

                                <div className={'mt-auto flex flex-col gap-2 text-center px-4'}>
                                    <div className={'flex gap-2 w-full'}>
                                        <Button variant={'link'} size={'lg'} className={'mt-auto shrink-1'} asChild>
                                            <Link href={'/mobile/tasks'}>
                                                Back

                                            </Link>
                                        </Button>
                                        <Button size={'lg'} className={'w-full grow-1'}
                                                onClick={() => api?.scrollNext(true)}>Verify instantly</Button>
                                    </div>
                                    <p className={"text-xs text-gray-400"}>By continuing, you agree to the terms &
                                        privacy policy</p>
                                </div>
                            </div>
                        </CarouselItem>

                        <CarouselItem className={'shrink-1 grow-0'}>
                            <Credentials onSuccessfulSubmit={() => api?.scrollNext(true)}/>
                        </CarouselItem>

                        <CarouselItem>
                            <div className={'h-full flex flex-col px-4'}>
                                <SuccessfullyMessage message={'Your employer account is successfully connected'}/>
                                <Button size={'lg'} className={'mt-auto'} asChild>
                                    <Link href={'/mobile/tasks'}>
                                        Back To Verification Center

                                    </Link>
                                </Button>
                            </div>
                        </CarouselItem>

                    </CarouselContent>
                </Carousel>
            </div>
    );
}

export default Page;