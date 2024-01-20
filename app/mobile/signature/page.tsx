import React from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Country from "@/app/mobile/nationality/_components/country";
import Link from "next/link";
import TermsItem from "@/app/mobile/signature/_components/terms-item";
import Task from "@/app/mobile/_components/task";
import {PenLine, ScanFace} from "lucide-react";

function Page() {
    const terms = ["You have a salary of at least $500", "You will not violate your visa terms and stay beyond 3 months from day of arrival", "You will be liable to charges and penalty fees in your home country if you violate the visa terms", "This is a legally binding document in your home country."];

    return (
        <div className={'items-center h-dvh grid grid-rows-[auto,1fr,auto] gap-6 p-4 w-full'}>
            <h1 className={'text-2xl font-bold text-center text-gray-900'}>Signature</h1>

            <div className={"w-full flex gap-2 flex-col items-center overflow-scroll h-full"}>
                <p className={"text-sm text-gray-500 text-center"}>You will sign a document acknowledging and confirming the followings sets of information.</p>

                {terms.map(term => <TermsItem key={term} text={term}/>)}

                <Task
                    icon={<PenLine absoluteStrokeWidth size={32}/>}
                    title={"E.signatures"}
                    subtitle={"Instant Verification"}
                    description={"Upload last 3 months bank statements"}
                />
            </div>

            <div className={"flex items-center justify-between w-full"}>
                <Link href={"/mobile"}>
                    <Button variant={"ghost"} size={"lg"}> Cancel </Button>
                </Link>
                <Link href={"/mobile/tasks"}>
                    <Button size={'lg'} >I Confirm</Button>
                </Link>
            </div>
        </div>
    );
}

export default Page;