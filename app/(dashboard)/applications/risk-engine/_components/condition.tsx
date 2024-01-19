import React from 'react';
import {Input} from "@/components/ui/input";

interface Props {
    where: string,
    value: string;
    evaluation: 'Low Risk' | "High Risk" | "Medium Risk";
}
function Condition({value, evaluation, where}: Props) {
    return (
        <div className={'flex items-center gap-4'}>
            <div className={'p-2 px-4 rounded-lg bg-accent text-gray-900 font-semibold'}> {where} </div>
            <span>Then</span>
            <Input defaultValue={value} className={"w-32 font-medium"}/>
            <span>Then</span>
            <div className={`p-2 px-4 rounded-lg ${evaluation === "Low Risk"? "bg-green-100 text-green-600" : evaluation === "Medium Risk" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}> {evaluation}</div>
        </div>
    );
}

export default Condition;