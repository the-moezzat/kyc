import React from 'react';
import {Button} from "@/components/ui/button"
import {Briefcase, Landmark, MapPin, PenLine, ScanFace} from "lucide-react";
import Task from "@/app/mobile/_components/task";
import Link from "next/link";
import Icon from "@/components/icon";

const tasks = [{
    icon: <Icon.Bank />,
    title: " Bank Statement ",
    subtitle: " Instant Verification ",
    description: "  Upload last 3 months bank statements",
    done: true,
},{
    icon: <Icon.BriefCase/>,
    title: " Employment",
    subtitle: "  Instant Verification",
    description: "  Upload last 3 months bank statements",
    done: false
},
//     {
//     icon: <MapPin size={32} /> ,
//     title: " Proof of Address",
//     subtitle: "  Instant Verification",
//     description: "  Upload last 3 months bank statements",
// }
]
function Page() {
    return (
        <div className={"flex flex-col items-center h-full py-8"}>
            <div className={"text-center space-y-2"}>
                <h1 className={"font-bold text-gray-900 text-2xl"}>Tasks</h1>
                <p className={"text-sm text-gray-500"}>1 of 2 tasks completed</p>
            </div>

            <div className={"flex flex-col gap-2 mt-4 mb-8"}>
                {tasks.map((task) => ( <Link key={task.title} href={"/mobile/upload-files"}>
                        <Task {...task}/>
                    </Link>)) }
            </div>

            <Button size={"lg"} className={'mt-auto'}>Next</Button>
        </div>
    );
}

export default Page;