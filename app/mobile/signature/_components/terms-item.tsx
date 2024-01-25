import React from 'react';
import {CheckCircle2} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import {CheckedState} from "@radix-ui/react-checkbox";


function TermsItem({text, className, onCheck}: {text: string, className?: string, onCheck?: (checkedState: CheckedState)=>void}) {
    return (
            <div className="items-center flex gap-2 justify-between w-full py-2">
                <label
                    htmlFor={text}
                    className="text-sm font-normal text-gray-700 leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2 items-center  "
                >
                    <CheckCircle2 className={"text-blue-500 shrink-0"} size={28}/>
                    <span>
                        {text}
                    </span>
                </label>

                <Checkbox id={text} className={"h-6 w-6"}
                onCheckedChange={(state) => onCheck?.(state)}/>
            </div>
    );
}

export default TermsItem;