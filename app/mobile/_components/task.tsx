import React from 'react';
import {Check, ChevronRight} from "lucide-react";

interface Props {
    done?: boolean;
    icon: React.ReactNode;
    subtitle: string;
    title: string;
    description: string;
}
function Task({done, icon, subtitle, title, description}: Props) {
    return (
        <div className={"border rounded-lg px-3 py-3 grid grid-cols-[auto,1fr,auto] gap-2 items-center w-full"}>
            <div className={"text-primary"}>
                {icon}
            </div>
            <div className={'flex flex-col'}>
                <span className={"text-xs text-green-600 tracking-wide"}>{subtitle}</span>
                <h3 className={"text-lg font-semibold text-gray-800"}>{title}</h3>
                <p className={"text-xs text-gray-600"}>{description}</p>
            </div>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${ done ? "text-white bg-[#00A980]" : "bg-[#D3D3D3] text-[#404040]"}`}>
                {done? <Check size={18} /> : <ChevronRight size={18} />}
            </div>
        </div>
    );
}

export default Task;