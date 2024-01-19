import React from 'react';
import {Button} from "@/components/ui/button";
import {UserCheck, UserX} from "lucide-react";

interface Props {
    customerRef: string;
    status: 'pending' | 'approved' | 'rejected';
}
function HeadCustomer({customerRef, status}: Props) {
    const riskLevel = Math.floor(Math.random() * 100);

    return (
        <header className={'flex gap-2 items-center max-md:flex-col max-md:items-start'}>
            <h2 className={'text-3xl font-semibold text-gray-900 max-md:text-3xl'}>Ref - {customerRef}</h2>

            {status === "pending" && <>
                <div className={`rounded-lg px-5 py-1.5 text-white
                ${riskLevel > 75? "bg-green-500" 
                    : (riskLevel > 45 && riskLevel < 75) ?
                        "bg-yellow-500" : 
                        "bg-red-500"}`}>
                    <p className={'text-lg font-semibold  max-md:text-base'}>{riskLevel}% {riskLevel > 75 ? "Low Risk"
                        : (riskLevel > 45 && riskLevel < 75) ?
                            "Medium Risk" :
                            "High Risk"}</p>
                </div>

                <div className={'ml-auto max-md:ml-0 flex gap-4 items-center mt-6'}>
                    <Button
                        className={'font-semibold text-red-500 hover:text-red-500 hover:bg-red-50 border-red-500 flex gap-2'}
                        variant={'outline'}>
                        <UserX/>
                        <span>
                    Reject
                    </span>
                    </Button>
                    <Button
                        className={'text-green-500 hover:text-green-500 font-semibold  hover:bg-green-50 border-green-500 flex gap-2'}
                        variant={'outline'}>
                        <UserCheck/>
                        <span>
                            Accept
                        </span>
                    </Button>
                </div>
            </>}

            {status === "approved" && <>
                <div className={'rounded-lg bg-green-500 px-5 py-1.5 text-white flex gap-2 max-md:text-sm'}>
                    <UserCheck/>
                    <span>
                        Accept
                    </span>
                </div>
            </>}

            {status === "rejected" && <>
                <div className={'rounded-lg bg-red-500 px-5 py-1.5 text-white flex gap-2'}>
                    <UserX/>
                    <span>
                        Reject
                    </span>
                </div>
            </>}
        </header>
    );
}

export default HeadCustomer;