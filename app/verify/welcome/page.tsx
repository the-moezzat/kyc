'use client';
import React from 'react';
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
        <div className={"h-dvh grid grid-rows-2 gap-8"}>
            <Image src={"/Header.png"} alt={"Header"} width={375} height={200} className={" h-full w-full object-cover"}/>

            <div className={"flex flex-col justify-between items-center p-4"}>

                <Carousel setApi={setApi}>
                    <CarouselContent>
                        <CarouselItem>
                            <div className={"space-y-4"}>
                                <h1 className={"text-2xl text-center font-semibold text-gray-900"}>Track your mood and
                                    reflect on your day</h1>
                                <p className={'text-sm text-center text-gray-600'}>Get an overview of how you are
                                    performing and motivate yourself to achieve even moew.</p>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className={"space-y-4"}>
                                <h1 className={"text-2xl text-center font-semibold text-gray-900"}>Your data is in safe
                                    place</h1>
                                <p className={'text-sm text-center text-gray-600'}>We don&lsquo;t share your data with
                                    anyone</p>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className={"space-y-4"}>
                                <h1 className={"text-2xl text-center font-semibold text-gray-900"}>Get notified</h1>
                                <p className={'text-sm text-center text-gray-600'}>You will receive an email from us once the verification process has been ended</p>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    {/*<CarouselPrevious/>*/}
                    {/*<CarouselNext/>*/}
                </Carousel>

                <div className={'flex gap-1'}>
                    {Array.from({length: count}).map((_, index) => <div key={index} className={`w-4 h-1 rounded-full transition-all  ${index === current? "bg-gray-900" : "bg-gray-300"} `}/>)}
                </div>

                <div className={'flex gap-4 w-full items-center justify-between'}>
                    <Link href={"/mobile/nationality"} className={"w-full"}>
                        <Button variant={'outline'} size={"lg"}>Skip</Button>
                    </Link>

                    <Button size={"lg"} className={'flex gap-2 items-center'} onClick={() => api?.scrollNext(true)} asChild={count === current + 1}>
                        {count === current + 1 ? <Link href={"/mobile/nationality"}>Next</Link> : "Next"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Page;