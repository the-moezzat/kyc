"use client"
import React from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Country from "@/app/mobile/nationality/_components/country";
import Link from "next/link";
import {faker} from "@faker-js/faker";
import {ScrollArea} from "@/components/ui/scroll-area";

const countries =['india', 'Nigeria', "Indonesia"]
function Page() {
    const [selectedCountry, setSelectedCountry] = React.useState<string>("");

    return (
        <div className={'items-center h-dvh grid grid-rows-[auto,1fr,auto] gap-6 p-4 w-full'}>
            <h1 className={'text-2xl font-bold text-center text-gray-900'}>Select Your Nationality</h1>
            <div className={"w-full flex gap-2 flex-col justify-start overflow-auto h-full mt-8"}>
                {/*<Input placeholder={"Search for country"} className={"h-14 w-full sticky top-0 shrink-0 z-30 shadow-lg"}/>*/}
                {countries.map((country) => ( <Country key={country} name={country} onClick={() => setSelectedCountry(country)} selected={ selectedCountry === country}/>)) }
            </div>
            <div className={"flex items-center justify-between w-full"}>
                <Link href={"/mobile"}>
                    <Button variant={"ghost"} size={"lg"}>  Cancel </Button>
                </Link>

                    <Button size={'lg'} asChild={selectedCountry?.length > 0} disabled={selectedCountry.length === 0}>
                        <Link href={"/mobile/signature"}>
                            Next
                        </Link>
                    </Button>

            </div>
        </div>
    );
}

export default Page;