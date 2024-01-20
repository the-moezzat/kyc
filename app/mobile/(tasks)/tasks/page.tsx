import React from 'react';
import {Button} from "@/components/ui/button"
import {Briefcase, Landmark, MapPin, PenLine, ScanFace} from "lucide-react";
import Task from "@/app/mobile/_components/task";
import Link from "next/link";

const tasks = [{
    icon: <ScanFace size={32}/> ,
    title: " Passport ",
    subtitle: " Instant Verification ",
    description: "  Upload last 3 months bank statements",
},{
    icon: <Landmark size={32} />,
    title: " Bank Statement ",
    subtitle: " Instant Verification ",
    description: "  Upload last 3 months bank statements",
},{
    icon: <Briefcase size={32}/>,
    title: " Employment",
    subtitle: "  Instant Verification",
    description: "  Upload last 3 months bank statements",
},{
    icon: <MapPin size={32} /> ,
    title: " Proof of Address",
    subtitle: "  Instant Verification",
    description: "  Upload last 3 months bank statements",
},{
    icon: <PenLine size={32} />,
    title: "E.signatures ",
    subtitle: "  Instant Verification",
    description: "  Upload last 3 months bank statements",
},]
function Page() {
    return (
        <div className={"flex flex-col items-center py-8"}>
            <div className={"text-center space-y-2"}>
                <h1 className={"font-bold text-gray-900 text-2xl"}>Tasks</h1>
                <p className={"text-sm text-gray-500"}>1 of 6 tasks completed</p>
            </div>

            <div className={"flex flex-col gap-2 mt-4 mb-8"}>
                {tasks.map((task) => ( <Link key={task.title} href={"/mobile/upload-files"}>
                        <Task  done {...task}/>
                    </Link>)) }
            </div>

            <Button size={"lg"}>Next</Button>
        </div>
    );
}

export default Page;