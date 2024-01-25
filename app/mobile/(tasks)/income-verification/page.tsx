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
import BankList from "@/app/mobile/(tasks)/income-verification/_components/bank-list";

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
    const [selectedBank, setSelectedBank] = React.useState<string | null>(null)

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
        <div className={""}>
            <Carousel orientation={'vertical'} setApi={setApi} opts={{watchDrag: false}} className={'h-[calc(100dvh-64px)]'}>
                <CarouselContent className={'h-[calc(100dvh-64px)]'}>
                    <CarouselItem  className={'h-full'}>
                        <div className={'flex flex-col h-full py-4'}>
                            <StartVerification title={'Verify Your Income'} icon={<Image src={'/bank.png'} alt={'bank icon'} width={62} height={62}/>}/>

                            <div className={'mt-auto flex flex-col gap-2 text-center px-4'}>
                                <div className={'flex gap-2 w-full'}>
                                    <Button variant={'link'} size={'lg'} className={'mt-auto shrink-1'} asChild>
                                        <Link href={'/mobile/tasks'}>
                                            Back

                                        </Link>
                                    </Button>
                                    <Button size={'lg'} className={'w-full grow-1'} onClick={() => api?.scrollNext(true)}>Verify instantly</Button>
                                </div>
                                <p className={"text-xs text-gray-400"}>By continuing, you agree to the terms &
                                    privacy policy</p>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem className={'h-[calc(100dvh-64px)]'}>
                        <div className={'grid grid-rows-[auto,1fr,auto] h-full gap-4'}>
                            <h2 className={'text-2xl text-gray-900 font-bold mb-4 text-center'}>Select your bank</h2>
                            <BankList onSelect={(bank) => setSelectedBank(bank)} selectedBank={selectedBank}/>
                            <div className={'flex justify-between items-center w-full px-3 '}>
                                <Button size={'lg'} variant={'ghost'} onClick={() => api?.scrollPrev(true)}>back</Button>
                                <Button size={'lg'} disabled={!selectedBank} onClick={() => api?.scrollNext(true)}>Next</Button>
                            </div>
                        </div>

                    </CarouselItem>
                    <CarouselItem>
                        <div className={'flex flex-col items-center h-full'}>
                            <Image src={'/mandiri.svg'} alt={'Mandiri bank logo'} width={70} height={50} className={'w-24'}/>

                            <Credentials onSuccessfulSubmit={() => api?.scrollNext(true)}/>
                            <Button size={'sm'} variant={'link'} className={'p-0'} onClick={() => api?.scrollPrev(true)}>Back</Button>
                        </div>

                    </CarouselItem>
                    <CarouselItem>
                        <div className={'h-full flex flex-col px-4'}>
                            <SuccessfullyMessage message={'Your Mandiri Bank is successfully connected'}/>
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