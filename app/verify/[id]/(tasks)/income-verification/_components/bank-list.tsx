'use client';

import React from 'react';
import {faker} from "@faker-js/faker";
import { CaretRight } from '@phosphor-icons/react/dist/ssr';
import {ScrollArea} from "@/components/ui/scroll-area";
import {Check} from "lucide-react";

interface Props {
    onSelect: (bank: string) => void;
    selectedBank: string | null;
}

const banks = Array.from({length: 10}).map(() => faker.company.name())
function BankList({onSelect, selectedBank}: Props) {
    return (
        <ScrollArea className={'h-full px-3'}>
            <div className={'h-full flex flex-col gap-2'}>
                {banks.map(bank => <div
                    key={bank} onClick={() => {onSelect(bank)}}
                    className={`p-4 border rounded-lg flex w-full text-gray-700 justify-between items-center ${selectedBank === bank ? "bg-gray-200" : ""}`}
                >
                    <p>
                        {bank}
                    </p>
                    { selectedBank === bank ? <Check size={18}/> : <CaretRight/>}
                </div>)}
            </div>
        </ScrollArea>
    );
}

export default BankList;