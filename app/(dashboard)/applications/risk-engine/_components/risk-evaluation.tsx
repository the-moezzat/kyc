import React from 'react';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Condition from "./condition";

interface Props {
    title: string;
    children: React.ReactNode;
}
function RiskEvaluation({title, children}:Props) {
    return (
        <div className={"flex flex-col gap-4"}>
            <div className={'flex items-center justify-between'}>
                <h3 className={'text-gray-900 text-lg'}>{title}</h3>
                {/*<div className={'flex gap-3 items-center'}>*/}
                {/*    <Label className={'text-lg text-gray-900 font-normal'}>Weight</Label>*/}
                {/*    <Input type={'number'} min={0}  className={'h-10 w-20 appearance-none'}/>*/}
                {/*</div>*/}
            </div>
            {children}

        </div>
    );
}

export default RiskEvaluation;