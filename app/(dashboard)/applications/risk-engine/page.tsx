import Link from "next/link";
import {MoveLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import RiskCard from "./_components/risk-card";
import {faker} from "@faker-js/faker";

function Page() {
    return (
        <>
            <header className={'mb-10'}>
                <Link href={"/applications"} className={'text-primary flex gap-2 items-center text-sm w-fit'}>
                    <MoveLeft size={18} />
                    <span>
                        Back
                    </span>
                </Link>

                <div className={'mt-4 flex items-center justify-between'}>
                    <h2 className={'text-3xl font-semibold text-gray-900 '}>Risk Engine</h2>
                    <Button className={'shadow-sm'}>Create</Button>
                </div>
            </header>

            <div className={'space-y-8'}>
                <RiskCard country={'Palestine'}/>
                <RiskCard country={'Egypt'}/>
                <RiskCard country={'Saudi Arabia'}/>
            </div>
        </>
    );
}

export default Page;